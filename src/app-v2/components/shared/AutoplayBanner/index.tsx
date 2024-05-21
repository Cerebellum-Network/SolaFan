import 'swiper/swiper.min.css';

import {makeStyles, Theme} from '@material-ui/core';
import {Children, memo, ReactNode} from 'react';
import {Autoplay, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react';

const DEFAULT_ANIMATION_DELAY = 3000;

const useStyles = makeStyles<Theme, {animationDelay?: number}>((theme) => ({
  root: {
    position: 'relative',
    borderRadius: 0,

    [theme.breakpoints.up('md')]: {
      // 700px
      width: '700px',

      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '24px',
      overflow: 'hidden',
    },
    [theme.breakpoints.up('lg')]: {
      // 1280px
      width: '1200px',
    },
  },
  mainSwiper: {
    height: '100%',
    width: '100%',

    '& .swiper-pagination': {
      display: 'flex',
      justifyContent: 'center',
      height: '2px',
      position: 'absolute',
      width: '100%',
      padding: '0 40px',
      bottom: '20px',

      [theme.breakpoints.down('md')]: {
        padding: '0 16px',
        bottom: '16px',
      },

      '& .swiper-pagination-bullet': {
        position: 'relative',
        height: '2px',
        flexGrow: 2,
        borderRadius: '1px',
        backgroundColor: theme.palette.common.white,
        opacity: 1,

        '&:before': {
          content: '""',
          position: 'absolute',
          left: 0,
          height: '100%',
          width: '100%',
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          height: '100%',
          width: '0%',
          left: 0,
          backgroundColor: theme.palette.common.white,
        },
      },

      '& .swiper-pagination-bullet-active': {
        backgroundColor: 'unset',
        '&:before': {
          backgroundColor: theme.palette.grey[500],
        },
        '&:after': {
          width: '100% !important',
          transition: ({animationDelay}) => `width ${animationDelay ?? DEFAULT_ANIMATION_DELAY}ms linear`,
        },
      },

      '& .swiper-pagination-bullet-active ~ .swiper-pagination-bullet': {
        backgroundColor: theme.palette.grey[500],
        '&:before': {
          backgroundColor: theme.palette.grey[500],
        },
        '&:after': {
          width: '0 !important',
        },
      },
    },
  },
}));

type Props = {
  children: ReactNode;
  animationDelay?: number;
};

export const AutoplayBanner = memo(({children, animationDelay}: Props) => {
  const classes = useStyles({animationDelay});

  const childrenArray = Children.toArray(children);

  return (
    <Swiper
      className={classes.mainSwiper}
      autoplay={{
        delay: animationDelay ?? DEFAULT_ANIMATION_DELAY,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: false,
      }}
      modules={[Autoplay, Pagination]}
    >
      {childrenArray.map((childrenElement, index: number) => (
        <SwiperSlide key={`key=${index}`}>{childrenElement}</SwiperSlide>
      ))}
    </Swiper>
  );
});
