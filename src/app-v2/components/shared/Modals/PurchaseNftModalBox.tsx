import {Divider, makeStyles, Modal, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactElement} from 'react';

import {mobileLandscapeMediaQuery} from '../../../styles/mediaQueries';
import {useThemeBreakpoints} from '../../../styles/useThemeBreakpoints';
import {CloseButton} from '../../primitives/CloseButton';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      alignItems: 'end',
    },
  },
  root: {
    padding: '24px 23.5px 0',
    backgroundColor: '#F8F8FA',
    borderRadius: '12px',
    [theme.breakpoints.down('md')]: {
      borderRadius: '12px 12px 0 0',
      minWidth: '100%',
      maxWidth: '100%',
    },
    [mobileLandscapeMediaQuery(theme)]: {
      position: 'relative',
      top: 0,
      left: 0,
      transform: 'unset',
      width: 'unset',
      borderRadius: '0',
      minWidth: '100%',
      minHeight: '100%',
    },
  },
  header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '4px 16px 8px',

    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: '16px',
      padding: '16px 16px 8px',
    },
  },
  container: {
    padding: '0 16px 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'auto 30px',
    gridColumnGap: '4px',
  },
}));

type Props = {
  icon?: ReactElement;
  title: string;
  subTitle?: string;
  onClose: () => void;
  children: ReactElement;
  classes?: Partial<Record<'root', string>>;
};

export const PurchaseNftModalBox = memo(({icon, title, subTitle, classes, onClose, children}: Props) => {
  const styles = useStyles();
  const {isMobile} = useThemeBreakpoints();

  return (
    <Modal
      open
      onClose={onClose}
      style={{
        display: 'flex',
        alignItems: isMobile ? 'end' : 'center',
        justifyContent: 'center',
      }}
      classes={classes}
    >
      <div className={clsx(styles.root, classes?.root)}>
        <div className={clsx(styles.header)}>
          <div className={styles.grid}>
            <div>
              {icon && <div>{icon}</div>}
              <Typography variant={isMobile ? 'subtitle1' : 'h2'}>{title}</Typography>
            </div>
            <CloseButton onClick={onClose} />
          </div>
          <Divider />
          {subTitle && <Typography variant="body2">{subTitle}</Typography>}
        </div>
        <div className={clsx(styles.container)}>{children}</div>
      </div>
    </Modal>
  );
});
