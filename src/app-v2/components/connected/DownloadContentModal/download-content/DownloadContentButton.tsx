import {Button} from '@cere/rxb-template-ui-kit';
import {makeStyles, Typography} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import {ReactComponent as DownloadIcon} from 'assets/download.svg';
import clsx from 'clsx';
import {useDisclosure} from 'shared/hooks/use-disclosure';

import {UsersNftCardInterface} from '../../../../types/nft';
import {DownloadContentModal} from './DownloadContentModal';

export const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('lg')]: {
      minHeight: '30px',
      minWidth: '30px',
      padding: '0 0 4px 0',
    },
  },
  buttonHeight: {
    background: 'rgba(22, 22, 22, 0.7)',
    backdropFilter: 'blur(22px)',
    '&:hover': {
      background: 'rgba(22, 22, 22, 0.7)',
      backdropFilter: 'blur(22px)',
    },

    [theme.breakpoints.up('lg')]: {
      height: '48px',
      width: '184px',
      backgroundColor: theme.palette.background.paper,
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
      },
    },
  },
  downloadIcon: {
    [theme.breakpoints.down('lg')]: {
      '& path': {
        stroke: theme.palette.background.paper,
      },
    },
  },
  downloadButtonText: {
    display: 'inline',
    marginLeft: '12px',
    marginTop: '12px',
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  downloadLink: {
    display: 'none',
  },
}));

interface FormButtonProps {
  nft?: UsersNftCardInterface;
}

export const DownloadContentButton = ({nft}: FormButtonProps) => {
  const {t} = useLocalization();
  const classes = useStyles();

  const disclosureProps = useDisclosure();

  return (
    <>
      <Button
        component="a"
        variant="contained"
        className={clsx(classes.buttonHeight, classes.root)}
        id="content-link"
        onClick={disclosureProps.onOpen}
      >
        <DownloadIcon className={classes.downloadIcon} />
        <Typography variant="h4" className={classes.downloadButtonText}>
          {t('View Content')}
        </Typography>
      </Button>
      <DownloadContentModal nft={nft} {...disclosureProps} />
    </>
  );
};
