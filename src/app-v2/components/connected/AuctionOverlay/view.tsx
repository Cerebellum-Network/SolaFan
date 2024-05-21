import {Typography} from '@cere/rxb-template-ui-kit';
import {Box} from '@material-ui/core';
import clsx from 'clsx';
import {SyntheticEvent, useCallback, useEffect, useState} from 'react';

import {useScrollToElement} from '../../../../shared/hooks/scroll-to-element.hook';
import {getMediaUrl} from '../../../../shared/lib/media';
// import {CmsExhibitionNft} from '../../../../shared/types/graphql';
import {ReactComponent as Arrow} from '../../../assets/svg/arrow.svg';
import {useLocalization} from '../../../hooks/use-locale.hook';
import BootstrapLoader from '../../shared/BootstrapLoader';
// import {OverlayLandscape} from '../../shared/OverlayLandscape';
import {useStyles} from './styles';

interface AuctionOverlayProps {
  event: any; // TODO add a proper type for this
  eventLoading: boolean;
}

export const AuctionOverlayContainer = ({event, eventLoading}: AuctionOverlayProps) => {
  // const {setSelectedNftIndex, selectedNftIndex} = useContext(AuctionContext);
  const url = event && getMediaUrl(event?.image);
  const classes = useStyles({url});
  const {refElement, scrollToElement} = useScrollToElement();
  const {t} = useLocalization();
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    showMore && scrollToElement();
  }, [scrollToElement, showMore]);

  if (!event || eventLoading) {
    return <BootstrapLoader />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onToggleDetailsClick = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      setShowMore((state: boolean) => {
        return !state;
      });
    },
    [setShowMore],
  );

  return (
    <Box className={classes.main}>
      <Box pt="60px" marginTop="auto" {...{ref: refElement}}>
        <Typography variant="h4" className={classes.title}>
          {event.title}
        </Typography>
      </Box>

      {/*<OverlayLandscape onPlaceBid={onPlaceBid} onBuy={onBuy} showMore={showMore} setShowMore={setShowMore} />*/}

      <Box className={classes.pointer} onClick={onToggleDetailsClick}>
        <Typography variant="h5">{showMore ? t('Show less info') : t('Show more info')}</Typography>
        <Arrow className={clsx(classes.moreIcon, showMore && classes.moreIconRotate)} />
      </Box>
    </Box>
  );
};
