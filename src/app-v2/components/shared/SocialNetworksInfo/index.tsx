import {Icon} from '@cere/rxb-template-ui-kit';
import {FullCreatorInterface} from '@cere/services-types';
import {Box, makeStyles, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {ReactElement} from 'react';

import {ReactComponent as FacebookIcon} from '../../../assets/socialNetworks/facebook.svg';
import {ReactComponent as InstagramIcon} from '../../../assets/socialNetworks/instagram.svg';
import {ReactComponent as TiktokIcon} from '../../../assets/socialNetworks/tiktok.svg';
import {ReactComponent as TwitterIcon} from '../../../assets/socialNetworks/twitter.svg';
import {ReactComponent as YoutubeIcon} from '../../../assets/socialNetworks/youtube.svg';
import {formatSocialCounterCount} from '../../../utils/helpers/formatSocialCounterCount';

type ArtistSocialNetworkNumberFieldName =
  | 'instagramFollowerNumber'
  | 'facebookFollowerNumber'
  | 'twitterFollowerNumber'
  | 'youtubeFollowerNumber'
  | 'tiktokFollowerNumber';

const SOCIAL_NETWORKS: {
  fieldName: ArtistSocialNetworkNumberFieldName;
  icon: ReactElement;
}[] = [
  {
    icon: <InstagramIcon />,
    fieldName: 'instagramFollowerNumber',
  },
  {
    icon: <FacebookIcon />,
    fieldName: 'facebookFollowerNumber',
  },
  {
    icon: <TwitterIcon />,
    fieldName: 'twitterFollowerNumber',
  },
  {
    icon: <YoutubeIcon />,
    fieldName: 'youtubeFollowerNumber',
  },
  {
    icon: <TiktokIcon />,
    fieldName: 'tiktokFollowerNumber',
  },
];

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'row',
    gap: '24px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[100],
  },
  count: {
    fontWeight: 500,
    fontSize: '14px',
    lineWeight: '22px',
    paddingTop: '8px',
    color: theme.palette.text.primary,
  },
}));

type Props = {
  user: FullCreatorInterface;
  classes?: Partial<Record<'list' | 'item' | 'icon' | 'count', string>>;
};

export const SocialNetworksInfo = ({user, classes}: Props) => {
  const styles = useStyles();
  const socialNetworksToShow = SOCIAL_NETWORKS.filter(({fieldName}) => user?.[fieldName]);

  if (socialNetworksToShow.length === 0) {
    return <></>;
  }

  return (
    <Box className={clsx(styles.list, classes?.list)}>
      {socialNetworksToShow.map((network) => (
        <Box key={network.fieldName} className={clsx(styles.item, classes?.item)}>
          <Icon icon={<Box className={clsx(styles.icon, classes?.icon)}>{network.icon}</Box>} />
          <Typography className={clsx(styles.count, classes?.count)}>
            {formatSocialCounterCount(user[network.fieldName])}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
