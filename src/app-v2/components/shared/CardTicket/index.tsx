import {Box, makeStyles, Typography} from '@material-ui/core';
import {memo, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

import {ImageSquare} from '../../primitives/ImageSquare';
import {StyledLink} from '../../primitives/StyledLink';
import {ReactComponent as TicketIcon} from './ticket.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
    width: 'fit-content',
  },
  imageBox: {
    width: '130px',
  },
  link: {
    textDecoration: 'unset',
  },
  infoBox: {
    maxWidth: '270px',
    minWidth: '270px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textBox: {
    padding: '12px',
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
    backgroundColor: theme.palette.background.default,
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  yourNftTicket: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: theme.palette.info.main,
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.common.white,
  },
}));

type Props = {
  title: string;
  image?: string;
  cardLink: string;
  subTitle: NonNullable<ReactNode>;
  cardBadge?: NonNullable<ReactNode>;
};

export const CardTicket = memo(({title, image, cardLink, subTitle, cardBadge}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Box className={styles.imageBox}>
        <StyledLink to={cardLink}>
          <ImageSquare image={image} title={title} />
        </StyledLink>
      </Box>
      <Box className={styles.infoBox}>
        <Box className={styles.textBox}>
          <Box>{cardBadge}</Box>
          <Typography className={styles.title}>{title}</Typography>
          <Box>{subTitle}</Box>
        </Box>

        <Typography className={styles.yourNftTicket}>
          <span>{t('Your NFT ticket')}</span>
          <TicketIcon />
        </Typography>
      </Box>
    </Box>
  );
});
