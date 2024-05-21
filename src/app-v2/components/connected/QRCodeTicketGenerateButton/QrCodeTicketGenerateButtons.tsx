import {cx} from '@linaria/core';
import {Button, CircularProgress} from '@material-ui/core';
import {useEffect, useState} from 'react';

import {GoogleAnalyticsId} from '../../../../analytics-ids';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {walletConnectionService} from '../../../models/wallet';
import {CmsExhibit} from '../../../types/exhibit';
import {UsersNftCardInterface} from '../../../types/nft';
import {TicketModal} from './modals/TicketModal';

type Props = {
  userWalletAddress?: string;
  event: Pick<CmsExhibit, 'id' | 'creator' | 'image' | 'eventType' | 'eventHiddenLocation' | 'startsAt' | 'title'>;
  userNfts: Pick<UsersNftCardInterface, 'exhibitionId' | 'address' | 'collectionAddress'>[];
  buttonSize?: 'small' | 'medium' | 'large';
};

export const QrCodeTicketGenerateButton = ({event, buttonSize, userWalletAddress, userNfts}: Props) => {
  const {t} = useLocalization();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ticketDialog, setTicketDialog] = useState<boolean>(false);
  const [qrCodeData, setQrCodeData] = useState<Record<string, any>>({});

  const userNft = userNfts.find((nft) => nft.exhibitionId === event.id);

  const updateQrCode = async () => {
    const walletConnection = await walletConnectionService.getSigner();
    const data = {
      nftId: userNft?.address,
      collectionId: userNft?.collectionAddress,
      wallet: userWalletAddress,
      timestamp: new Date().getTime(),
      eventId: event.id,
    };
    const signature = await walletConnection.signMessage(`${data.timestamp} ${data.eventId} ${data.wallet}`);
    const result = {...data, signature};
    setQrCodeData(result);
  };

  useEffect(() => {}, []);

  const onGenerateTicket = async () => {
    setIsLoading(true);
    try {
      await updateQrCode();
      setTicketDialog(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userNft || !userWalletAddress || event.eventType !== 'in_person') {
    return <></>;
  }

  return (
    <>
      <Button
        variant={isLoading ? 'outlined' : 'contained'}
        disabled={isLoading}
        size={buttonSize}
        onClick={() => onGenerateTicket()}
        className={cx(GoogleAnalyticsId.GenerateTicketBtn)}
      >
        {isLoading ? <CircularProgress color="inherit" size={24} thickness={2} /> : t('Generate My Ticket')}
      </Button>
      <TicketModal open={ticketDialog} event={event} qrCodeData={qrCodeData} onClose={() => setTicketDialog(false)} />
    </>
  );
};
