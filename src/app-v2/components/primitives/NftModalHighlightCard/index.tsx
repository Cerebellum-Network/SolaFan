import {Box, makeStyles, Typography} from '@material-ui/core';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {ImageSquare} from '../ImageSquare';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '82px',
    padding: '4px',
    display: 'flex',
    borderRadius: '12px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
    backgroundColor: theme.palette.background.paper,
  },
  imageBox: {
    width: '50px',
    borderRadius: '6px',
    overflow: 'hidden',
  },

  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '2px',
  },
  collectableName: {
    color: '#717178',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

type Props = {
  image: string;
  title: string;
  creator?: string;
};

export const NftModalHighlightCard = memo(({image, title}: Props) => {
  const styles = useStyles();
  const {t} = useTranslation();

  return (
    <div className="grid grid-cols-[auto_max-content]">
      <Box className={styles.infoBox}>
        <Typography className={styles.collectableName} variant="body2">
          {t('Collectible name')}
        </Typography>

        <Typography variant="body1">{title}</Typography>
      </Box>
      <Box className={styles.imageBox}>
        <ImageSquare image={image} title={title} />
      </Box>
    </div>
  );
});
