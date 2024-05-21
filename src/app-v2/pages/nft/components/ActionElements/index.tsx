import {NftCardInterface, NftType} from '@cere/services-types';
import {Box, makeStyles, Typography} from '@material-ui/core';
import {memo, ReactNode, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {QuantitySelect} from '../../../../components/primitives/QuantitySelect';
import {createQuantityOptions} from '../../../../components/primitives/QuantitySelect/createQuantityOptions';

const useStyles = makeStyles((theme) => ({
  quantityTitle: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 600,
  },
  quantityBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '18px',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start',
      paddingBottom: '12px',
    },
  },
  quantitySelectBox: {
    flexGrow: 2,
    [theme.breakpoints.up('lg')]: {
      maxWidth: '280px',
    },
  },
  priceAndButtonBox: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '20px',
    },
  },
  priceBox: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '12px 0',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '0',
    },
  },
  count: {
    fontSize: '13px',
    lineHeight: '22px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  countBold: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 600,
  },
  price: {
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: 800,
  },
  button: {
    textTransform: 'none',
    height: '48px',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '240px',
    },
  },
}));

type Props = {
  nft: NftCardInterface;
  quantityToBuy: number;
  setQuantityToBuy: (quantity: string) => void;
  children: ReactNode;
};

export const ActionElements = memo(({nft, quantityToBuy, setQuantityToBuy, children}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  const quantityOptions = useMemo(() => createQuantityOptions(nft.balance), [nft.balance]);

  // TODO - specify this useMemo with nft value
  const disabledQuantiy = useMemo(() => false, []);

  if (nft.nftType === NftType.AUCTIONED) {
    return (
      <Box className={styles.priceAndButtonBox}>
        <Box className={styles.priceBox}>
          <Box>
            <Typography variant="caption" className={styles.countBold}>
              1{' '}
            </Typography>
            <Typography variant="caption" className={styles.count}>
              {t('Auctioned Original')}
            </Typography>
          </Box>
          <Typography className={styles.price}>${nft.priceUsd}</Typography>
        </Box>
        {children}
      </Box>
    );
  }

  return (
    <>
      <Box className={styles.quantityBox}>
        <Typography className={styles.quantityTitle}>{t('Quantity')}</Typography>
        <Box className={styles.quantitySelectBox}>
          <QuantitySelect
            quantityOptions={quantityOptions}
            quantity={quantityToBuy}
            setQuantity={setQuantityToBuy}
            disabledQuantiy={disabledQuantiy}
          />
        </Box>
      </Box>
      <Box className={styles.priceAndButtonBox}>
        <Box className={styles.priceBox}>
          <Box>
            <Typography variant="caption" className={styles.countBold}>
              {nft.balance}
            </Typography>
            <Typography variant="caption" className={styles.count}>
              /{nft.supply} {t('collectibles left')}
            </Typography>
          </Box>
          <Typography className={styles.price}>${nft.priceUsd}</Typography>
        </Box>
        {children}
      </Box>
    </>
  );
});
