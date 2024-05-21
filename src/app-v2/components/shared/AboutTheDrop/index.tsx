import {ExhibitCardInterface, FullCreatorInterface} from '@cere/services-types';
import {Box, makeStyles, Typography} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {Skeleton} from '../../../components/primitives/Skeleton';
import {TextWithShowMore} from '../../../components/primitives/TextWithShowMore';
import {EventCreatorSkeleton} from '../../../components/shared/Skeletons';
import {CreatorBlock} from '../CreatorBlock';

const useStyles = makeStyles((theme) => ({
  aboutBox: {
    paddingTop: '48px',
    paddingBottom: '20px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: '48px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '54px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '83px',
    },
  },
  aboutTitle: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    paddingBottom: '16px',
    [theme.breakpoints.up('md')]: {
      fontSize: '30px',
      lineHeight: '36px',
    },
    [theme.breakpoints.up('lg')]: {
      fontWeight: 800,
    },
  },
  aboutSkeleton: {
    width: '100%',
    height: '90px',
    borderRadius: '12px',
  },
  text: {
    color: theme.palette.grey[700],
  },
}));

type Props = {
  event: ExhibitCardInterface | null;
  creator: FullCreatorInterface | null;
};

export const AboutTheDrop = memo(({event, creator}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <Box className={styles.aboutBox}>
      <Typography className={styles.aboutTitle}>{t('About the drop')}</Typography>

      {!event ? (
        <Skeleton variant="rect" className={styles.aboutSkeleton} />
      ) : (
        <TextWithShowMore classes={{text: styles.text}}>{creator?.about || ''}</TextWithShowMore>
      )}

      {!creator ? <EventCreatorSkeleton /> : <CreatorBlock creator={creator} />}
    </Box>
  );
});
