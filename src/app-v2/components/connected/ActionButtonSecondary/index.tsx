import {AuctionStatus, NftCardInterface} from '@cere/services-types';
import {Button, makeStyles} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    textTransform: 'none',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.info.main,
  },
}));

type Props = {
  nft: NftCardInterface;
};

// TODO - add logic for render action button
export const ActionButtonSecondary = memo(({nft}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  if (nft.auctionStatus === AuctionStatus.ACTIVE) {
    return (
      <Button variant="contained" className={styles.button}>
        {t('Bid')}
      </Button>
    );
  }

  return (
    <Button variant="contained" className={styles.button}>
      {t('Buy')}
    </Button>
  );
});
