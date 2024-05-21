import {Box, Button, Collapse, IconButton, makeStyles, Typography, Zoom} from '@material-ui/core';
import {InfoRounded} from '@material-ui/icons';
import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {AuctionLiveBadge} from '../../../../components/primitives/Badge/AuctionLiveBadge';
import {StyledLink} from '../../../../components/primitives/StyledLink';
import {BannerImagesBlock} from '../../../../components/shared/BannerImagesBlock';
import {useHover} from '../../../../hooks/useHover';
import {useThemeBreakpoints} from '../../../../styles/useThemeBreakpoints';
import {getDottedDate} from '../../../../utils/helpers/time';
import {useMainStyles} from './styles';

const useStyles = makeStyles((theme) => ({
  subTitle: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      paddingTop: '12px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '12px',
      fontSize: '16px',
    },
  },
}));

type Props = {
  link: string;
  title: string;
  description?: string;
  additionalImages: string[];
  startsAt?: string;
  endsAt?: string;
  handleOpenInfo: () => void;
};

export const BannerEvent = memo(
  ({link, title, description, additionalImages, startsAt, endsAt, handleOpenInfo}: Props) => {
    const [hoverRef, isHovered] = useHover();
    const {t} = useTranslation();
    const mainStyles = useMainStyles({isHovered});
    const styles = useStyles();
    const {isDesktop} = useThemeBreakpoints();

    const renderBadge = useCallback(() => <AuctionLiveBadge />, []);

    return (
      <div className={mainStyles.root} ref={hoverRef}>
        <Box className={mainStyles.infoContainer}>
          <Box className={mainStyles.badgeBox}>{renderBadge()}</Box>
          <Box className={mainStyles.bottomElement}>
            <Box className={mainStyles.infoBox}>
              <Typography className={mainStyles.title}>{title}</Typography>
              <Typography className={styles.subTitle}>
                {startsAt && getDottedDate(startsAt)} - {endsAt && getDottedDate(endsAt)}
              </Typography>
            </Box>

            <Box className={mainStyles.controlBox}>
              <StyledLink to={link}>
                <Button variant="contained" className={mainStyles.button}>
                  {t('View event')}
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
  },
);
