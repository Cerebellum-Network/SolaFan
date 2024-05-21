import {makeStyles} from '@material-ui/core';

import {ReactComponent as VerifiedAuthorIcon} from './assets/verifiedAuthor.svg';

const useStyles = makeStyles(() => ({
  verifiedAuthorIcon: {
    margin: '0 0 3px 4px',
  },
}));

export const VerifiedAuthorBadge = () => {
  const styles = useStyles();
  return <VerifiedAuthorIcon className={styles.verifiedAuthorIcon} />;
};
