import {ExhibitCardInterface} from '@cere/services-types';
import {Box, Button, Dialog, Grid, makeStyles, Typography, Zoom} from '@material-ui/core';
import {TransitionProps} from '@material-ui/core/transitions';
import {Loop} from '@material-ui/icons';
import {forwardRef, memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {ROUTES} from '../../../constants/routes';
import {mobileLandscapeMediaQuery} from '../../../styles/mediaQueries';
import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {getDottedDate} from '../../../utils/helpers/time';
import {ButtonPulsating} from '../../primitives/ButtonPulsating';
import {CardSquare} from '../CardSquare/card-square';
import {CuratedRow} from '../CuratedRow';
import {ExhibitBadge} from '../ExhibitBadge';

const useStyles = makeStyles((theme) => ({
  topBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '16px',
    borderRadius: '12px',
    overflow: 'hidden',
    padding: '24px',
    marginBottom: '30px',
    backgroundColor: theme.palette.grey[900],
    [theme.breakpoints.up('md')]: {
      marginBottom: '36px',
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '68px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row',
      gap: '20px',
    },
  },
  mainTitle: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },

    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    color: theme.palette.primary.light,
    [theme.breakpoints.up('md')]: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 800,
      paddingBottom: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '48px',
      lineHeight: '58px',
      fontWeight: 800,
      paddingBottom: '24px',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      paddingBottom: 0,
      flexGrow: 2,
    },
  },
  playAgain: {
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'none',
    color: theme.palette.primary.light,
    order: 2,
    [mobileLandscapeMediaQuery(theme)]: {
      order: 0,
    },
  },
  exhibitsTitle: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    color: theme.palette.primary.light,
    paddingBottom: '16px',
    [theme.breakpoints.up('md')]: {
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: 800,
      paddingBottom: '20px',
    },
  },
  desktopExhibitCard: {
    width: '400px',
    maxWidth: '400px',
  },
}));

const useDialogStyles = makeStyles(() => ({
  paper: {
    maxWidth: 'unset',
    backgroundColor: 'unset',
    boxShadow: 'none',
  },
  scrollPaper: {
    alignItems: 'flex-end',
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

type Props = {
  onClose: () => void;
  morePopularExhibits: ExhibitCardInterface[] | null;
  handleOpenPurchaseNFTs: () => void;
  onShareExhibit: (exhibitId: string) => void;
  onPlayAgain: () => void;
};

export const EndExhibitVideoDialog = memo(
  ({onClose, morePopularExhibits, handleOpenPurchaseNFTs, onShareExhibit, onPlayAgain}: Props) => {
    const dialogStyles = useDialogStyles();
    const styles = useStyles();
    const {t, i18n} = useTranslation();
    const {isDesktop} = useThemeBreakpoints();

    const renderBadge = useCallback(() => <ExhibitBadge />, []);
    const handleOpenVideoAgain = useCallback(() => {
      onClose();
      onPlayAgain();
    }, [onClose, onPlayAgain]);

    if (!morePopularExhibits) {
      return null;
    }

    return (
      <Dialog open fullWidth TransitionComponent={Transition} onClose={onClose} classes={dialogStyles}>
        <Box>
          <Box className={styles.topBox}>
            <Typography className={styles.mainTitle}>{t('End of exhibit video')}</Typography>
            <Button
              variant="text"
              startIcon={<Loop width="20px" />}
              className={styles.playAgain}
              onClick={handleOpenVideoAgain}
            >
              {t('Play video again')}
            </Button>
            <ButtonPulsating onClick={handleOpenPurchaseNFTs}>{t('Purchase exhibit NFTs')}</ButtonPulsating>
          </Box>

          {isDesktop ? (
            <CuratedRow title={t('Discover more exhibits')} slidesPerView={3}>
              {morePopularExhibits.map((exhibit) => (
                <Box key={exhibit.id} className={styles.desktopExhibitCard}>
                  <CardSquare
                    title={exhibit.title}
                    subTitle={exhibit.endsAt ? `Ends ${getDottedDate(exhibit.endsAt)}` : ''}
                    image={exhibit.image.url}
                    link={generatePath(ROUTES.EVENT, {locale: i18n.language, exhibitSlug: exhibit.slug})}
                    onShareClick={onShareExhibit.bind(null, `${exhibit.id}`)}
                    creator={exhibit.creator}
                    renderBadge={renderBadge}
                  />
                </Box>
              ))}
            </CuratedRow>
          ) : (
            <Box>
              <Typography className={styles.exhibitsTitle}>{t('Discover more exhibits')}</Typography>
              <Grid container spacing={3}>
                {morePopularExhibits.map((exhibit) => (
                  <Grid key={exhibit.id} item xs={12} md={6}>
                    <CardSquare
                      title={exhibit.title}
                      subTitle={exhibit.endsAt ? `Ends ${getDottedDate(exhibit.endsAt)}` : ''}
                      image={exhibit.image.url}
                      link={generatePath(ROUTES.EVENT, {locale: i18n.language, exhibitSlug: exhibit.slug})}
                      onShareClick={onShareExhibit.bind(null, `${exhibit.id}`)}
                      creator={exhibit.creator}
                      renderBadge={renderBadge}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Dialog>
    );
  },
);
