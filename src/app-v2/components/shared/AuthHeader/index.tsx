import {Typography} from '@cere/rxb-template-ui-kit';
import {Box, makeStyles} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  pointer: {
    cursor: 'pointer',
  },
  logo: {
    maxHeight: '30px',
  },
  subtitle: {
    color: '#6E6E79',
  },
}));

type AuthHeaderType = {
  className?: string;
  title: string;
  subtitle?: string;
  logoUrl: string;
  onLogoClick: () => void;
};

export const AuthHeader = ({className, title, subtitle, logoUrl, onLogoClick}: AuthHeaderType) => {
  const styles = useStyles();
  const {t} = useLocalization();
  return (
    <Box className={className}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="8px">
        <Typography variant="h2">{title}</Typography>
        <img className={clsx(styles.pointer, styles.logo)} onClick={onLogoClick} src={logoUrl} alt={t('logo')} />
      </Box>
      <Typography variant="body2" className={styles.subtitle}>
        {subtitle}
      </Typography>
    </Box>
  );
};
