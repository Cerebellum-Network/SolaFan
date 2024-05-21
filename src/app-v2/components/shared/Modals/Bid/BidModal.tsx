import {Box, Button, CircularProgress, Divider, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {ChangeEvent, memo, useCallback, useState} from 'react';

import {useLocalization} from '../../../../hooks/use-locale.hook';
import {transformPriceToTokens, transformTokensToPrice} from '../../../../utils/helpers/price';
import {AuctionTextField} from '../../../primitives/AuctionTextField';
import {CopyBox} from '../../../primitives/CopyBox';
import {ErrorMsg} from '../../../primitives/ErrorMsg';
import {NftModalHighlightCard} from '../../../primitives/NftModalHighlightCard';
import {NftModalValueBlock} from '../../../primitives/NftModalValueBlock';
import {StyledLink} from '../../../primitives/StyledLink';
import {WalletBalanceCard} from '../../../primitives/WalletBalanceCard';
import {Condition, ConditionsList} from '../../Conditions';
import {ReactComponent as BidIcon} from '../assets/bid.svg';
import {PurchaseModalBox} from '../PurchaseModalBox';
import {PurchaseModalBoxInner} from '../PurchaseModalBoxInner';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '200px',
    textTransform: 'none',
    [theme.breakpoints.up('md')]: {
      height: '44px',
    },
  },
  bidButton: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  inputBox: {
    width: '100%',
    position: 'relative',
    paddingTop: '16px',
  },
}));

type Props = {
  image?: string;
  creatorName?: string;
  title?: string;
  nftLink: string;
  walletName: string;
  walletBalance: number;
  nftAddress?: string;
  bidsCount: number;
  highestBid: number;
  nextMinBid: number;
  onClose: () => void;
  placeBid: (bid: number) => void;
  fundWallet: () => void;
};

export const BidModal = memo(
  ({
    image,
    creatorName,
    title,
    nftLink,
    walletName,
    walletBalance,
    nftAddress,
    bidsCount,
    highestBid,
    nextMinBid,
    onClose,
    placeBid,
    fundWallet,
  }: Props) => {
    const {t} = useLocalization();
    const styles = useStyles();

    const [isProcessing, setProcessing] = useState<boolean>(false);
    const [userBid, setUserBid] = useState<string>(transformTokensToPrice(nextMinBid).toString());

    const insufficientFunds = nextMinBid > walletBalance;
    const incorrectBidAmount = transformTokensToPrice(nextMinBid) > Number(userBid);

    const handleBidChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const bid = Number(e.target.value);
      if (isNaN(bid)) {
        setUserBid('0');
      }
      setUserBid(bid.toString());
    }, []);

    const handlePlaceBid = useCallback(() => {
      setProcessing(true);
      placeBid(transformPriceToTokens(Number(userBid)));
    }, [placeBid, userBid]);

    const renderNftCardAndUserWallet = useCallback(
      () => (
        <>
          {image && creatorName && title && (
            <StyledLink to={nftLink}>
              <NftModalHighlightCard image={image} creator={creatorName} title={title} />
            </StyledLink>
          )}
          <Box pt="16px">
            <WalletBalanceCard balance={transformTokensToPrice(walletBalance)} walletName={walletName} />
          </Box>
        </>
      ),
      [creatorName, image, nftLink, title, walletBalance, walletName],
    );

    const renderNftPriceInfo = useCallback(
      () => (
        <>
          {nftAddress && (
            <Box pb="8px">
              <CopyBox title={t('NFT ID')} copiedText={nftAddress} />
            </Box>
          )}
          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock title={t('Quantity')} value="1" />
          </Box>
          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock
              title={t('Highest bid')}
              subTitle={`(${bidsCount} ${t('bids')})`}
              value={`${transformTokensToPrice(highestBid).toFixed(2)} USDC`}
            />
          </Box>
          <Divider />
          <Box className={styles.inputBox}>
            <AuctionTextField
              value={userBid}
              onChange={handleBidChange}
              variant={insufficientFunds ? 'error' : incorrectBidAmount ? 'warning' : ''}
              helperText={
                insufficientFunds
                  ? t('Insufficient balance')
                  : incorrectBidAmount
                  ? `${t('Bid should be minimal')}`
                  : ''
              }
            />
          </Box>
        </>
      ),
      [
        bidsCount,
        handleBidChange,
        highestBid,
        incorrectBidAmount,
        insufficientFunds,
        nftAddress,
        styles.inputBox,
        t,
        userBid,
      ],
    );

    const renderAdditionalInfoBlock = useCallback(
      () => (
        <ConditionsList>
          <Condition condition={insufficientFunds}>
            <ErrorMsg variant="error" text="Insufficient balance, fund your wallet" />
          </Condition>
          <Condition condition={incorrectBidAmount}>
            <ErrorMsg
              variant="warning"
              text="Bid cannot be lower than starting price"
              price={transformTokensToPrice(nextMinBid).toString()}
            />
          </Condition>
        </ConditionsList>
      ),
      [incorrectBidAmount, insufficientFunds, nextMinBid],
    );

    const renderButtons = useCallback(
      () => (
        <>
          {insufficientFunds && (
            <Button variant="contained" color="primary" className={styles.button} onClick={fundWallet}>
              {t('Fund wallet')}
            </Button>
          )}
          <Button
            className={clsx(styles.button, styles.bidButton)}
            disabled={isProcessing || insufficientFunds || incorrectBidAmount}
            onClick={handlePlaceBid}
          >
            {isProcessing ? <CircularProgress /> : t('Place bid')}
          </Button>
        </>
      ),
      [
        fundWallet,
        handlePlaceBid,
        incorrectBidAmount,
        insufficientFunds,
        isProcessing,
        styles.bidButton,
        styles.button,
        t,
      ],
    );

    return (
      <PurchaseModalBox icon={<BidIcon />} title={t('Place bid')} onClose={onClose}>
        <PurchaseModalBoxInner
          renderNftCardAndUserWallet={renderNftCardAndUserWallet}
          renderNftPriceInfo={renderNftPriceInfo}
          renderAdditionalInfoBlock={renderAdditionalInfoBlock}
          renderButtons={renderButtons}
        />
      </PurchaseModalBox>
    );
  },
);
