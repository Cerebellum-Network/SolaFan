import {Modal, Snackbar, Typography} from '@cere/rxb-template-ui-kit';
import {styled} from '@linaria/react';
import {Box, makeStyles} from '@material-ui/core';
import {useEffect, useRef, useState} from 'react';
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from 'react-share';

import {useLocalization} from '../../../../app-v2/hooks/use-locale.hook';
import {POPUP_TIMEOUT_BEFORE_CLOSE} from '../../../../config/common'; // TODO move to v2 folder
import colors from '../../../../styles/colors'; // TODO move to v2 folder, in the future
import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {copyToClipboard} from '../../../utils/helpers/copyToClipboard';
import {ReactComponent as CheckIcon} from './assets/check.svg';
import {ReactComponent as CloseIcon} from './assets/close.svg';
import {ReactComponent as MailIcon} from './assets/email.svg';
import {ReactComponent as HyperlinkIcon} from './assets/hyperlink.svg';
import {ReactComponent as MoreIcon} from './assets/more.svg';

interface ShareProps {
  url: string;
  title: string;
  appTitle: string;
  description: string;
  imgSrc: string | undefined;
  onClose: () => void;
  entity?: string;
}

const StyledFacebookShareButton = styled(FacebookShareButton)`
  button > * {
    pointer-events: none;
  }
`;
const StyledTwitterShareButton = styled(TwitterShareButton)`
  button > * {
    pointer-events: none;
  }
`;

const useStyles = makeStyles(() => ({
  iconBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '52px',
    background: 'rgba(224, 224, 231, 0.3)',
    borderRadius: '12px',
    marginBottom: '10px',
    padding: '0 12px',
  },
  iconName: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 500,
    fontSize: '14px',
  },
  iconWrapper: {
    width: '32px',
    height: '32px',
    backgroundColor: colors.snowWhite,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionImage: {
    minWidth: '52px',
    maxWidth: '52px',
    height: '52px',
    borderRadius: '12px',
  },
  descriptionText: {
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
  },
  hyperLink: {
    textDecoration: 'none',
    width: '100%',
  },
  blockWidth: {
    width: '100%',
  },
  closeButton: {
    cursor: 'pointer',
  },
}));

const Share = ({appTitle, url, title, description, imgSrc, onClose, entity = 'NFT'}: ShareProps) => {
  const {t} = useLocalization();
  const timeout = useRef<number>();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const classes = useStyles();
  const {isMobile} = useThemeBreakpoints();

  const emailBody = t(
    'I found this rare NFT drop that I wanted to share with you. Click on the link to experience {{appTitle}} yourself. Buy NFT tickets for special access to view, buy, and auction for valuable exhibit NFTs. You are one step away from getting your hands on one of these unique collectibles.',
    {appTitle: appTitle},
  );
  const emailSubject = t('Join the exclusive {{appTitle}} NFT experience!', {appTitle: appTitle});
  const onSnackBarShow = () => {
    setShowSnackbar(true);

    timeout.current = window.setTimeout(() => {
      setShowSnackbar(false);
    }, POPUP_TIMEOUT_BEFORE_CLOSE);
  };

  const onSnackBarClose = () => {
    setShowSnackbar(false);
    clearTimeout(timeout.current);
    timeout.current = undefined;
  };

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  const handleOnClose = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  return (
    <Modal open onClose={handleOnClose} title={title} maxWidth="xs" disableScrollLock={true}>
      <Box>
        {showSnackbar && (
          <Snackbar
            open
            title=""
            text=""
            style={{
              background: '#161616',
              color: '#FAF9F5',
              padding: '18px',
            }}
          >
            <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" width="100%">
              <Box alignSelf="flex-start" marginRight="14px">
                <CheckIcon />
              </Box>
              <Box>
                <Typography variant="h3">{t('Link copied')}</Typography>
                <Typography variant="caption1">
                  {t('The link to share this {{entity}} has been copied to your clipboard', {entity})}
                </Typography>
              </Box>
              <Box className={classes.closeButton} alignSelf="flex-start" marginLeft="20px">
                <CloseIcon onClick={onSnackBarClose} />
              </Box>
            </Box>
          </Snackbar>
        )}

        <Box display="flex">
          <img className={classes.descriptionImage} alt="" src={imgSrc} />
          <Typography variant="body2" className={classes.descriptionText}>
            {description}
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" my="16px">
          <StyledFacebookShareButton url={url} className={classes.blockWidth}>
            <Box className={classes.iconBlock}>
              <Typography className={classes.iconName}>{t('Facebook')}</Typography>
              <FacebookIcon
                size={33}
                round
                bgStyle={{
                  fill: colors.snowWhite,
                }}
                iconFillColor={colors.primaryDark}
              />
            </Box>
          </StyledFacebookShareButton>

          <StyledTwitterShareButton url={url} className={classes.blockWidth}>
            <Box className={classes.iconBlock}>
              <Typography className={classes.iconName}>{t('Twitter')}</Typography>
              <TwitterIcon
                size={33}
                round
                bgStyle={{
                  fill: colors.snowWhite,
                }}
                iconFillColor={colors.primaryDark}
              />
            </Box>
          </StyledTwitterShareButton>

          <a
            href={`mailto:?subject=${emailSubject}
            &body=${emailBody} ${url}`}
            style={{display: 'inline-block', width: '100%', textDecoration: 'none'}}
          >
            <Box className={classes.iconBlock}>
              <Typography className={classes.iconName}>Mail</Typography>
              <Box className={classes.iconWrapper}>
                <MailIcon />
              </Box>
            </Box>
          </a>

          <a
            onClick={(event: React.MouseEvent<HTMLElement>) => copyToClipboard(event, url, onSnackBarShow)}
            href={url}
            className={classes.hyperLink}
          >
            <Box className={classes.iconBlock}>
              <Typography className={classes.iconName}>{t('Copy link')}</Typography>
              <Box className={classes.iconWrapper}>
                <HyperlinkIcon />
              </Box>
            </Box>
          </a>

          {isMobile && navigator.share && (
            <Box
              className={classes.iconBlock}
              onClick={() => {
                navigator.share({
                  url: url,
                });
              }}
            >
              <Typography className={classes.iconName}>{t('More options')}</Typography>
              <Box className={classes.iconWrapper}>
                <MoreIcon />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default Share;
