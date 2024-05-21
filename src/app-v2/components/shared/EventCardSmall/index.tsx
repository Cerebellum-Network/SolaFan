import {Box, makeStyles, Theme, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';

import {ReactComponent as ArrowRightIcon} from '../../../assets/svg/arrow-right.svg';
import {ReactComponent as LockClosedIcon} from '../../../assets/svg/lock-closed.svg';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {ConnectedEventUnlockProgress} from '../../connected/EventUnlockProgress';

export const useStyles = makeStyles<Theme>((theme) => ({
  block: {
    background: theme.palette.background.paper,
    padding: '12px',
    borderRadius: theme.shape.borderRadius,
    '&:not(:last-child)': {
      marginBottom: '12px',
    },
  },
  img: {
    maxWidth: '100%',
    width: '68px',
    height: '90px',
    borderRadius: '4px',
    marginRight: '12px',
    objectFit: 'cover',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: '68px auto 16px',
    columnGap: '12px',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  flexItemsCenter: {
    alignItems: 'center',
  },
  lockIcon: {
    width: '15px',
    height: '14px',
    marginRight: '4px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '22px',
    flex: 1,
  },
}));

type Props = {
  title: string;
  image: string;
  id: string | number;
  slug: string;
  isEventLocked: boolean;
  analyticEventId?: string;
};
export const EventCardSmall = ({title, image, slug, isEventLocked, analyticEventId}: Props) => {
  const {locale} = useLocalization();
  const classes = useStyles();
  return (
    <Box className={`${classes.block} ${classes.flexCol}`}>
      <Box className={`${classes.gridRow} ${classes.flexItemsCenter}`}>
        <Box className={classes.imgContainer}>
          <Link className={analyticEventId} to={`/${locale}/home/event/${slug}`}>
            <img className={classes.img} src={image} alt="" />
          </Link>
        </Box>
        <Box className={`${classes.flexCol}`}>
          <Box className={`${classes.flexRow} ${classes.flexItemsCenter}`}>
            {isEventLocked && <LockClosedIcon className={classes.lockIcon} />}
            <Link to={`/${locale}/home/event/${slug}`}>
              <Typography className={classes.title}>{title}</Typography>
            </Link>
          </Box>
          <ConnectedEventUnlockProgress eventSlug={slug} smallEventCard />
        </Box>
        <Link className="block" to={`/${locale}/home/event/${slug}`}>
          <ArrowRightIcon />
        </Link>
      </Box>
    </Box>
  );
};
