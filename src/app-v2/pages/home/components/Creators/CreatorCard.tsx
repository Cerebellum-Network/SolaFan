import {UploadFileInterface} from '@cere/services-types';
import {Box, makeStyles} from '@material-ui/core';
import {memo} from 'react';

import {CardCollapsed} from '../../../../components/shared/CardCollapsed';
import {useValueByResolution} from '../../../../utils/hooks/use-resolution.hook';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '85vw',
    maxWidth: '300px',
    height: '281px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      width: '360px',
      maxWidth: '360px',
    },
  },
}));

type Props = {
  link: string;
  creatorName: string;
  creatorAbout: string;
  creatorAvatar: string;
  desktopBackgroundImage: UploadFileInterface;
  tabletBackgroundImage: UploadFileInterface;
  mobileBackgroundImage: UploadFileInterface;
};

export const CreatorCard = memo(
  ({
    link,
    creatorName,
    creatorAbout,
    creatorAvatar,
    desktopBackgroundImage,
    tabletBackgroundImage,
    mobileBackgroundImage,
  }: Props) => {
    const styles = useStyles();
    const {value: bgImageByResolution} = useValueByResolution<UploadFileInterface>({
      desktop: desktopBackgroundImage,
      tablet: tabletBackgroundImage,
      mobile: mobileBackgroundImage,
    });

    return (
      <Box className={styles.root}>
        <CardCollapsed
          link={link}
          creatorName={creatorName}
          avatarUrl={creatorAvatar}
          description={creatorAbout}
          headerImageUrl={bgImageByResolution?.url}
        />
      </Box>
    );
  },
);
