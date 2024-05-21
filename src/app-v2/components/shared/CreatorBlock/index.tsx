import {FullCreatorInterface} from '@cere/services-types';
import {Box, makeStyles} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {ROUTES} from '../../../constants/routes';
import {AvatarWithName} from '../../primitives/AvatarWithName/avatar-with-name';
import {StyledLink} from '../../primitives/StyledLink';
import {SocialNetworksInfo} from '../SocialNetworksInfo';

const useStyles = makeStyles((theme) => ({
  creator: {
    paddingTop: '18px',
  },
  networksInfoBox: {
    paddingTop: '12px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '343px',
    },
  },
}));

const useAvatarStyles = makeStyles((theme) => ({
  avatar: {
    width: '32px',
    height: '32px',
    marginRight: '9px',
  },
  name: {
    fontSize: '16px',
    color: theme.palette.text.primary,
  },
  verifiedBadge: {
    minWidth: '20px',
    height: '20px',
  },
}));

type Props = {
  creator: FullCreatorInterface;
};

export const CreatorBlock = memo(({creator}: Props) => {
  const {i18n} = useTranslation();
  const styles = useStyles();
  const avatarStyles = useAvatarStyles();

  const link = generatePath(ROUTES.CREATOR, {locale: i18n.language, artistId: creator?.id});

  return (
    <Box>
      <Box className={styles.creator}>
        <StyledLink to={link}>
          <AvatarWithName creator={creator} isVerified classes={avatarStyles} />
        </StyledLink>
      </Box>
      <Box className={styles.networksInfoBox}>
        <SocialNetworksInfo user={creator} />
      </Box>
    </Box>
  );
});
