import {Avatar} from '@cere/rxb-template-ui-kit';
import {makeStyles} from '@material-ui/core';
import {Box, Tooltip, Typography} from '@material-ui/core';
import clsx from 'clsx';

import {GoogleAnalyticsId} from '../../../../analytics-ids';
import {ReactComponent as VerifiedAuthorBadge} from '../../primitives/AvatarWithName/verifiedAuthor.svg';
import {StyledLink} from '../../primitives/StyledLink';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    height: '100%',
  },
  container: {
    height: '100%',

    '&:hover': {
      '& .header': {
        height: '25%',
      },
      '& .cardInfo': {
        height: '75%',
      },
      '& .description': {
        overflow: 'hidden',
        WebkitLineClamp: 'unset',
        height: 'calc(70%)',
      },
    },
  },
  header: {
    width: '100%',
    height: '50%',
    transition: 'height 100ms ease-out',
  },
  headerImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  cardInfo: {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 24px',
  },
  avatarBox: {
    marginTop: '-29px',
  },
  artistAvatar: {
    maxWidth: '58px',
    maxHeight: '58px',
  },
  descriptionBox: {
    flexGrow: 2,
  },
  description: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.7)',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
  },
  creatorNameBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    paddingTop: '4px',
  },
  artistName: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  verifiedAuthorBadge: {
    minWidth: '16px',
    maxWidth: '16px',
  },
}));

type Props = {
  link: string;
  creatorName: string;
  description: string;
  avatarUrl: string;
  headerImageUrl?: string;
};

export const CardCollapsed = ({link, creatorName, description, avatarUrl, headerImageUrl}: Props) => {
  const classes = useStyles();

  return (
    <StyledLink to={link} className={clsx(classes.root, GoogleAnalyticsId.ViewCreatorBtn)}>
      <Box className={classes.container}>
        <Box className={clsx(classes.header, 'header')}>
          <img className={classes.headerImage} src={headerImageUrl} alt={creatorName} />
        </Box>
        <Box className={clsx(classes.cardInfo, 'cardInfo')}>
          <Box className={classes.avatarBox}>
            <Avatar src={avatarUrl} size="large" className={classes.artistAvatar} />
          </Box>
          <Tooltip title={creatorName}>
            <Box className={classes.creatorNameBox}>
              <Typography className={classes.artistName}>{creatorName}</Typography>
              <VerifiedAuthorBadge className={classes.verifiedAuthorBadge} />
            </Box>
          </Tooltip>
          <Box className={classes.descriptionBox}>
            <Typography className={clsx(classes.description, 'description')}>{description}</Typography>
          </Box>
        </Box>
      </Box>
    </StyledLink>
  );
};
