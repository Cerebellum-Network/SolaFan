import {createFreeportCollection} from '@cere/freeport-sc-sdk';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';

import {TOKEN_DECIMALS_POW} from '../../../../../config/common';
import {usdWithCentsToDecimals} from '../../../../../shared/lib/formatPrice';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {walletConnectionService} from '../../../../models/wallet';
import {UsersNftCardInterface} from '../../../../types/nft';
import {ErrorMsg} from '../../../primitives/ErrorMsg';
import {ImageSquare} from '../../../primitives/ImageSquare';

const useStyles = makeStyles((theme) => ({
  fieldsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '8px',
    margin: '16px 0',
  },
  field: {
    flexGrow: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px',
    },
  },
  nftBlock: {
    marginTop: '8px',
    background: '#E0E0E7',
    padding: '8px',
    borderRadius: '12px',
  },
  imageRoot: {
    padding: '0',
  },
  imageBox: {
    position: 'relative',
    height: 'auto',
    paddingBottom: '-100%',
  },
  nftImage: {
    width: '60px',
    height: '60px',
  },
  accordion: {
    backgroundColor: 'transparent',
    border: '1px solid #E0E0E7',
    borderRadius: '12px',
  },
  accordionDetails: {
    padding: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  avatar: {
    width: '22px',
    height: '22px',
    marginRight: '3px',
    fontSize: '12px',
    backgroundColor: theme.palette.secondary.light,
  },
  submitButton: {
    marginTop: '16px',
  },
  table: {
    '& .MuiTableRow-head': {
      '& .MuiTableCell-head': {
        borderBottom: 'none',
      },
    },
    '& .MuiTableCell-head': {
      color: '#5F5C64',
      fontSize: '12px',
      lineHeight: '18px',
    },
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root:last-child': {
        '& .MuiTableCell-root': {
          borderBottom: 'none',
        },
      },
    },
  },
}));

type Props = {
  amount: number;
  price: number;
  onSell: (price: number, quantity: number) => void;
  nft?: UsersNftCardInterface;
};

const getRoyalties = async (nftId: string, collectionAddress: string, priceInDollars: number) => {
  const signer = await walletConnectionService.getSigner();
  const collection = createFreeportCollection({signer, contractAddress: collectionAddress!});
  const priceInUnits = usdWithCentsToDecimals(priceInDollars, TOKEN_DECIMALS_POW);

  const [, royaltyAmount] = await collection.royaltyInfo(nftId, priceInUnits);

  const royaltyAmountNumber = Number(royaltyAmount.toString());
  const priceNumber = Number(priceInUnits.toString());
  const royaltyPercentage = ((royaltyAmountNumber * 100) / priceNumber).toFixed(2);
  return Math.round(parseFloat(royaltyPercentage)).toString();
};

export const NftForm = ({nft, amount, price, onSell}: Props) => {
  const {t} = useLocalization();
  const [sellingPrice, setSellingPrice] = useState<number | undefined>(price);
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [royalty, setRoyalty] = useState<number>(0);
  const [royaltiesLoading, setRoyaltiesLoading] = useState<boolean>(false);
  const styles = useStyles();

  const fetchRoyalties = useCallback(
    async (price: number) => {
      if (nft?.address && nft?.collectionAddress) {
        setRoyaltiesLoading(true);
        try {
          const royalties = await getRoyalties(nft.address, nft.collectionAddress, price);
          setRoyalty(+royalties);
        } catch (error) {
          console.error('Error fetching royalties:', error);
        } finally {
          setRoyaltiesLoading(false);
        }
      }
    },
    [nft],
  );

  useEffect(() => {
    if (nft) {
      void fetchRoyalties(nft.priceUsd);
    }
  }, [fetchRoyalties, nft]);

  const handlePriceChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const inputPrice = e.target.value;
      if (inputPrice === '') {
        setSellingPrice(undefined);
      } else {
        const nftPrice = Number(inputPrice);
        setSellingPrice(nftPrice);
        if (!isNaN(nftPrice) && nftPrice > 0) {
          await fetchRoyalties(nftPrice);
        }
      }
    },
    [fetchRoyalties],
  );

  const hasError = useMemo(() => {
    if (sellingPrice === undefined) {
      return true;
    } else {
      const nftPrice = Number(sellingPrice);
      return isNaN(nftPrice) || nftPrice < 0;
    }
  }, [sellingPrice]);

  const handleOnSellClick = useCallback(() => {
    setProcessing(true);
    onSell(sellingPrice!, amount);
  }, [onSell, amount, sellingPrice]);

  const totalPrice = useMemo(() => {
    if (!nft?.priceUsd) return 0;
    return (nft.priceUsd + nft.priceUsd * (royalty / 100)).toFixed(2);
  }, [nft?.priceUsd, royalty]);

  return (
    <>
      <Typography>{t("Decide how many collectibles you're willing to sell and at what price")}</Typography>
      <Box className={styles.nftBlock}>
        <div className="grid grid-cols-[60px_auto] gap-x-3 items-center">
          <ImageSquare
            image={nft?.image}
            title={nft?.title}
            classes={{root: styles.imageRoot, image: styles.nftImage, imageBox: styles.imageBox}}
          />
          <Box>
            <Typography variant="subtitle1">{nft?.title}</Typography>
            <div className="flex">
              <Typography variant="body2" className="!mr-4">
                Price: {sellingPrice || 0}$
              </Typography>
              <Typography variant="body2">Quantity: {amount}</Typography>
            </div>
          </Box>
        </div>
      </Box>
      <Box className={styles.fieldsRow}>
        <Box className={styles.field}>
          <TextField
            fullWidth
            variant="outlined"
            InputProps={{endAdornment: <InputAdornment position="start">USD</InputAdornment>}}
            inputProps={{type: 'number'}}
            label={t('Price')}
            value={sellingPrice}
            onChange={handlePriceChange}
            disabled={isProcessing}
          />
        </Box>
        <Box className={styles.field}>
          <TextField
            fullWidth
            variant="outlined"
            inputProps={{type: 'number'}}
            label={t('Quantity')}
            value={amount}
            disabled
          />
        </Box>
      </Box>
      {hasError && (
        <Box pb="16px">
          <ErrorMsg variant="error" text={`${t('Min price has to be more than')} 0`} />
        </Box>
      )}
      {royaltiesLoading ? (
        <CircularProgress size="0.5rem" />
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <Box>
              <Typography variant="body2">{t('Listing price for each')}</Typography>
              <Typography variant="caption">
                {t('{{royalty}}%  of royalties will be shared with others', {royalty})}
              </Typography>
            </Box>
            <Typography variant="body1">{totalPrice} USD</Typography>
          </div>
          <Divider />
          <div className="flex justify-between items-center mt-2">
            <Box>
              <Typography variant="body2">{t('Your total income')}</Typography>
            </Box>
            <Typography variant="body1">{(nft?.priceUsd || 0) * amount} USD</Typography>
          </div>
        </>
      )}

      <Button
        fullWidth
        variant="contained"
        color="default"
        className={styles.submitButton}
        disabled={hasError || isProcessing}
        onClick={handleOnSellClick}
      >
        {isProcessing ? <CircularProgress size={30} /> : t('List For Sale')}
      </Button>
    </>
  );
};
