import {Box, Button, CircularProgress, Grid, TextField, Tooltip, Typography} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import {ChangeEvent, useCallback, useState} from 'react';

import {useLocalization} from '../../../../../app-v2/hooks/use-locale.hook';
import {transformTokensToPrice} from '../../../../utils/helpers/price';
import {ErrorMsg} from '../../../primitives/ErrorMsg';
import {useSellModalStyles} from './styles';

type FixedPriceBlockProps = {
  quantity: number;
  price: number;
  currency?: string;
  royalty: number;
  onClose: () => void;
  onSellClick: (price: number, quantity: number) => void;
};

export const FixedPriceBlock = ({
  quantity,
  price,
  currency = 'USDC',
  royalty,
  onSellClick,
  onClose,
}: FixedPriceBlockProps) => {
  const {t} = useLocalization();
  const styles = useSellModalStyles();

  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [hasError, setError] = useState<boolean>(false);
  const [sellingPrice, setSellingPrice] = useState<number>(price);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nftPrice = Number(e.target.value);
    if (!nftPrice || nftPrice < 0) {
      setError(true);
    } else {
      setError(false);
    }
    setSellingPrice(transformTokensToPrice(nftPrice));
  };

  const handleSell = useCallback(() => {
    setProcessing(true);
    onSellClick(sellingPrice, quantity);
  }, [onSellClick, quantity, sellingPrice]);

  return (
    <>
      <Box className={styles.fieldsBox}>
        <Box className={styles.field}>
          <TextField
            fullWidth
            variant="outlined"
            inputProps={{type: 'number'}}
            label={t('Quantity')}
            value={quantity}
            disabled
          />
        </Box>
        <Box className={styles.field}>
          <TextField fullWidth variant="outlined" label={t('Currency')} value={currency} disabled />
        </Box>
        <Box className={styles.field}>
          <TextField
            fullWidth
            variant="outlined"
            inputProps={{type: 'number'}}
            label={t('Price')}
            value={transformTokensToPrice(price).toFixed()}
            onChange={handlePriceChange}
            disabled={isProcessing}
          />
        </Box>
      </Box>
      {hasError && (
        <Box pt="16px">
          <ErrorMsg variant="error" text={`${t('Min price has to be more than')} 0`} />
        </Box>
      )}
      <Box className={styles.infoBox}>
        <Typography className={styles.infoText}>
          {t('{{royalties}} royalties deducted from listing price', {royalties: royalty})}
        </Typography>
        <Tooltip title={t('Royalties are split between the creator, DaVinci and Cere DDC.')} placement="left">
          <InfoIcon className={styles.infoIcon} />
        </Tooltip>
      </Box>

      <Box className={styles.buttonsBox}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" className={styles.button} disabled={isProcessing} onClick={onClose}>
              {t('Cancel')}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={styles.button}
              disabled={hasError || isProcessing}
              onClick={handleSell}
            >
              {isProcessing ? <CircularProgress size={30} /> : t('Sell')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
