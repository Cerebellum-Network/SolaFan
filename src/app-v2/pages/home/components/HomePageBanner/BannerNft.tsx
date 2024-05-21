import {Box, Button, Collapse, IconButton, makeStyles, Typography, Zoom} from '@material-ui/core';
import {InfoRounded} from '@material-ui/icons';
import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {LimitedBadge} from '../../../../components/primitives/Badge/LimitedBadge';
import {StyledLink} from '../../../../components/primitives/StyledLink';
import {BannerImagesBlock} from '../../../../components/shared/BannerImagesBlock';
import {useHover} from '../../../../hooks/useHover';
import {useThemeBreakpoints} from '../../../../styles/useThemeBreakpoints';
import {useMainStyles} from './styles';

const useStyles = makeStyles((theme) => ({
  creatorBox: {
    paddingTop: '4px',
    [theme.breakpoints.up('md')]: {
      order: -1,
      paddingBottom: '12px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: '16px',
    },
  },
  whiteColor: {
    color: theme.palette.common.white,
  },
  price: {
    fontWeight: 800,
    fontSize: '16px',
    lineHeight: '22px',
    color: theme.palette.secondary.main,
  },
}));

type Props = {
  link: string;
  title: string;
  description?: string;
  additionalImages: string[];
  creatorName: string;
  creatorLogo: string;
  priceUSD?: number;
  handleOpenInfo: () => void;
};

export const BannerNft = memo(({link, title, description, additionalImages, priceUSD, handleOpenInfo}: Props) => {
  const [hoverRef, isHovered] = useHover();
  const {t} = useTranslation();
  const mainStyles = useMainStyles({isHovered});
  const styles = useStyles();
  const {isDesktop} = useThemeBreakpoints();

  const renderBadge = useCallback(() => <LimitedBadge />, []);

  return (
    <div className={mainStyles.root} ref={hoverRef}>
      <Box className={mainStyles.infoContainer}>
        <Box className={mainStyles.badgeBox}>{renderBadge()}</Box>
        <Box className={mainStyles.bottomElement}>
          <Box className={mainStyles.infoBox}>
            <Typography className={mainStyles.title}>{title}</Typography>

            <Box className={styles.creatorBox}>
              {/*<AvatarWithName name={creatorName} image={creatorLogo} isVerified classes={{name: styles.whiteColor}} />*/}
            </Box>
          </Box>

          <Box className={mainStyles.controlBox}>
            <Typography className={styles.price}>${priceUSD?.toFixed(2)}</Typography>
            <StyledLink to={link}>
              <Button variant="contained" color="primary" className={mainStyles.button}>
                {t('Buy')}
              </Button>
            </StyledLink>
          </Box>

          <Collapse in={isHovered && isDesktop}>
            <Typography className={mainStyles.description}>{description}</Typography>
          </Collapse>
        </Box>
      </Box>
      <Zoom in={isHovered && isDesktop}>
        <Box className={mainStyles.hoverImageBlock}>
          <BannerImagesBlock url1={additionalImages[0]} url2={additionalImages[1]} url3={additionalImages[2]} />
        </Box>
      </Zoom>

      {!isDesktop && (
        <IconButton className={mainStyles.infoButton} onClick={handleOpenInfo}>
          <InfoRounded className={mainStyles.infoButtonIcon} />
        </IconButton>
      )}
    </div>
  );
});
