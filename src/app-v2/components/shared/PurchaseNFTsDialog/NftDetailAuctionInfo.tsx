import {WalletInterface} from '@cere/services-types';
import {Box, Button, Collapse, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {BidInterfaceWithStatus} from '../../../types/auction';
import {BidHistory} from '../BidHistory';
import {ReactComponent as Check} from '../BidHistory/assets/check.svg';
import {useNftDetailAuctionInfoStyles} from './styles';

type Props = {
  isHighestBid: boolean;
  bids: BidInterfaceWithStatus[];
  userWalletAddress: string;
  externalWallets: WalletInterface[];
};

export const NftDetailAuctionInfo = ({isHighestBid, bids, userWalletAddress, externalWallets}: Props) => {
  const {t} = useTranslation();
  const styles = useNftDetailAuctionInfoStyles();

  const [isOpenMore, setIsOpenMore] = useState(false);

  const toggleMoreInfo = useCallback(() => setIsOpenMore((p) => !p), []);

  return (
    <>
      <Box className={styles.moreInfoHeader}>
        <Button
          variant="text"
          endIcon={<ExpandMoreIcon className={isOpenMore ? styles.rotateIcon : ''} />}
          className={styles.moreInfoButton}
          onClick={toggleMoreInfo}
        >
          {isOpenMore ? t('Less info') : t('More info')}
        </Button>

        <Box className={styles.notificationBlock}>
          {isHighestBid && (
            <Typography className={styles.isHighestBid}>
              <Check />
              {t('You have the highest bid!')}
            </Typography>
          )}
        </Box>
      </Box>
      <Collapse in={isOpenMore}>
        <Box className={styles.moreInfoBox}>
          <Typography className={styles.infoTitle}>{t('Bid history')}</Typography>
          <BidHistory
            bids={bids}
            userWalletAddress={userWalletAddress}
            externalWallets={externalWallets}
            classes={{headCell: styles.bidsHeadCell, tableText: styles.bidsCell}}
          />
        </Box>
      </Collapse>
    </>
  );
};
