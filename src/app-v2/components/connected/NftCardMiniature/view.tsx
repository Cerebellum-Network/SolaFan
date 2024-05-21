import {Box, CircularProgress, makeStyles, Typography} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import clsx from 'clsx';

import {useOnComponentRendered} from '../../../utils/hooks/use-on-component-rendered';

const useStyles = makeStyles((theme) => ({
  media: {
    borderRadius: '12px',
    width: '74px',
    height: '74px',
    marginRight: '12px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: ({imgSrc}: {imgSrc: string}) => `url(${imgSrc})`,
  },
  badge: {
    background: '#E0E0E7',
    borderRadius: '12px',
    padding: '8px',
    marginBottom: '24px',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  creatorName: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.grey[700],
  },
}));

export type NftCardMiniatureViewProps = {
  nftTitle: string;
  nftImageUrl: string;
  creatorName: string;
  auctionId?: string;
  orderId?: string;
  price: string;
  loadNftData: () => void;
};

export const NftCardMiniatureView = ({
  nftTitle,
  nftImageUrl,
  creatorName,
  price,
  orderId,
  auctionId,
  loadNftData,
}: NftCardMiniatureViewProps) => {
  const {t} = useLocalization();
  const classes = useStyles({imgSrc: nftImageUrl});
  const isLoading = !Boolean(creatorName);

  useOnComponentRendered(loadNftData);

  if (!orderId && !auctionId) {
    return null;
  }

  const renderPrice = () => {
    const formattedPrice = Number(price).toFixed(2);
    if (auctionId) {
      return (
        <Typography variant="h3">
          <b>
            {t('Your bid:')} ${formattedPrice}
          </b>
        </Typography>
      );
    }
    return (
      <Typography variant="h3">
        <b>${formattedPrice}</b>
      </Typography>
    );
  };

  return (
    <Box display="flex" className={clsx(classes.badge, {[classes.loading]: isLoading})}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box className={classes.media} />
          <Box>
            {/*{creatorName && (*/}
            {/*  <Typography className={classes.creatorName}>*/}
            {/*    {creatorName}*/}
            {/*    <VerifiedAuthorBadge />*/}
            {/*  </Typography>*/}
            {/*)}*/}
            <Box my="5px">
              <Typography variant="h3">{nftTitle}</Typography>
            </Box>
            {renderPrice()}
          </Box>
        </>
      )}
    </Box>
  );
};
