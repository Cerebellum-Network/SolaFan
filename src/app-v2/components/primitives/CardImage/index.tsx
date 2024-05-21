import {Box, makeStyles, Typography} from '@material-ui/core';
import {memo, ReactNode, useMemo} from 'react';
import {useSelector, useStore} from 'react-redux';
import {generatePath, Link} from 'react-router-dom';

import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {ImageSquareResponsive} from '../ImageSquare/image-square-responsive';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  link: {
    textDecoration: 'unset',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.grey[700],
    opacity: 0.9,
  },
  backdropInner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    color: theme.palette.common.white,
  },
}));

type Props = {
  nftId: string;
  children?: NonNullable<ReactNode>;
  imageBackdrop?: NonNullable<ReactNode>;
  cardLink?: string;
};

export const CardImage = memo(({nftId, children, imageBackdrop, cardLink}: Props) => {
  const styles = useStyles();
  const {getState} = useStore();
  const locale = useSelector(selectCurrentLocale);
  const nft = useMemo(() => {
    const state: any = getState();
    return selectNftById(state, nftId);
  }, [getState, nftId]);

  if (!nft) {
    return <></>;
  }

  return (
    <Box className={styles.root}>
      <Link to={cardLink || generatePath(ROUTES.NFT_PAGE, {nftId: nft.id, locale})} className={styles.link}>
        <ImageSquareResponsive size={300} nft={nft} borderRadius="12" />
      </Link>

      {imageBackdrop ? (
        <>
          <Box className={styles.backdrop} />
          <Typography className={styles.backdropInner}>{imageBackdrop}</Typography>
        </>
      ) : (
        children
      )}
    </Box>
  );
});

CardImage.displayName = 'CardImage';
