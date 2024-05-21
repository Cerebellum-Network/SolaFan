// Import Swiper styles
import 'swiper/swiper.min.css';

import {Box, IconButton, makeStyles, Typography} from '@material-ui/core';
import {ArrowForwardIos} from '@material-ui/icons';
import {Children, ReactNode, useRef} from 'react';
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('lg')]: {
      margin: '0 -16px -40px -16px',
      padding: '8px 16px 40px 16px',
      overflow: 'hidden',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  titlesBox: {
    '&:not(:empty)': {
      paddingBottom: '16px',

      [theme.breakpoints.up('lg')]: {
        paddingBottom: '24px',
      },
    },
  },
  headerButtons: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      height: '100%',
      minHeight: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      width: '116px',
      paddingBottom: '16px',
    },
  },
  headerButton: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
  },
  rotateIcon: {transform: 'rotate(180deg)'},
  swiper: {
    overflow: 'visible',
    paddingRight: '8px',
    [theme.breakpoints.up('lg')]: {
      paddingRight: 0,
    },
  },
  slide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
}));

type Props = {
  children: ReactNode;
  title?: string;
  subTitle?: string;
  slidesPerView?: number;
  gap?: number;
};
export const CuratedRow = ({children, title, subTitle, slidesPerView, gap}: Props) => {
  const styles = useStyles();

  const nextRef = useRef(null);
  const prevRef = useRef(null);

  const childrenArray = Children.toArray(children);

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Box className={styles.titlesBox}>
          {title && <Typography variant="h2">{title}</Typography>}
          {subTitle && <Typography variant="subtitle1">{subTitle}</Typography>}
        </Box>
        {childrenArray.length > (slidesPerView ?? 0) && (
          <Box className={styles.headerButtons}>
            <IconButton className={styles.headerButton} ref={prevRef}>
              <ArrowForwardIos className={styles.rotateIcon} />
            </IconButton>
            <IconButton className={styles.headerButton} ref={nextRef}>
              <ArrowForwardIos />
            </IconButton>
          </Box>
        )}
      </Box>

      <Swiper
        className={styles.swiper}
        slidesPerView={slidesPerView ?? 1}
        spaceBetween={gap ?? 0}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        modules={[Navigation]}
      >
        {childrenArray.map((childrenElement, index) => (
          <SwiperSlide key={`key=${index}`} className={styles.slide}>
            {childrenElement}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
