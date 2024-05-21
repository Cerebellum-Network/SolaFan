import {Backdrop, Box, Dialog, DialogContent, makeStyles} from '@material-ui/core';
import {useEffect, useState} from 'react';

import closeIcon from './close.svg';
import teaser from './teaser.png';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    backdropFilter: 'blur(5px)',
    zIndex: theme.zIndex.appBar + 1,
  },
  close: {
    '--size': '30px',
    background: '#efeff3',
    border: 'none',
    borderRadius: '100%',
    cursor: 'pointer',
    height: 'var(--size)',
    padding: 0,
    transition: 'background 100ms linear',
    width: 'var(--size)',
    position: 'absolute',
    top: '1rem',
    right: '1rem',

    '&:hover': {
      background: '#dddde6',
    },

    '& > img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
  root: {
    width: 500,
    minHeight: 500,
  },
  content: {
    '--green': '#36c366',
    padding: '1rem !important',
  },
  teaserBlock: {
    display: 'flex',
    justifyContent: 'center',
  },
  captionHeader: {
    fontSize: 24,
    lineHeight: 1.1,
    margin: '1rem 1rem 0',
    textAlign: 'center',
  },
  proposals: {
    display: 'grid',
    gap: '0 1rem',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  proposal: {
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '2px solid rgba(0, 0, 0, .1)',
    padding: '1rem',
    position: 'relative',
    background: '#f8f8fa',
    transition: 'box-shadow ease 0.5s',

    '&:hover': {
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    },

    '& > h3': {
      fontSize: '1rem',
      margin: 0,
      fontWeight: 600,
    },

    '& > .price': {
      margin: 0,
      color: 'var(--green)',
      fontSize: 20,
      fontWeight: 600,
    },

    '& > .details': {
      margin: '1rem 0',
    },

    '& > .save': {
      background: 'linear-gradient(270deg, #ff3b30 0%, #ff928b 100%)',
      fontWeight: 600,
      color: '#fff',
      padding: '2px 8px',
      borderRadius: 20,
      position: 'absolute',
      top: '-12px',
      right: '12px',
    },

    '& > button': {
      border: 0,
      background: 'transparent',
      padding: 0,
      margin: 0,
      cursor: 'pointer',
      color: 'var(--green)',
      display: 'flex',
      gap: '0 .5rem',
      alignItems: 'center',
      justifyContent: 'start',
    },
  },

  subscribe: {
    width: '100%',
    border: 0,
    borderRadius: '40px',
    background: 'var(--green)',
    fontSize: '1rem',
    padding: '.5rem 0',
    fontWeight: 600,
    color: '#fff',
  },
}));

const subscriptions = [
  {
    title: 'Base',
    price: 9.99,
    details: {movies: 2, months: 3},
    save: 0,
  },
  {
    title: 'Premium',
    price: 13.99,
    details: {movies: 4, months: 6},
    save: 25,
  },
  {
    title: 'Platinum',
    price: 19.99,
    details: {movies: 10, months: 12},
    save: 65,
  },
] as const;

export function SubscriptionsSelect() {
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  const onClose = () => setOpen(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Backdrop className={styles.backdrop} open={open}>
      <Dialog classes={{paper: styles.root}} open={open} onClose={onClose}>
        <DialogContent classes={{root: styles.content}}>
          <button onClick={onClose} aria-label="Close" className={styles.close} type="button">
            <img src={closeIcon} alt="" />
          </button>
          <Box mt={8} className={styles.teaserBlock}>
            <img alt="teaser" src={teaser} width="305" height="auto" />
          </Box>
          <h2 className={styles.captionHeader}>Watch more with extended subscription</h2>
          <Box mt={4} className={styles.proposals}>
            {subscriptions.map((item) => (
              <div className={styles.proposal} key={item.title}>
                {item.save > 0 && <div className="save">Save {item.save}%</div>}
                <h3>{item.title}</h3>
                <p className="price">${item.price}</p>
                <div className="details">
                  <div>
                    <b>{item.details.movies} movies</b>
                  </div>
                  <div>
                    <b>{item.details.months}</b> months
                  </div>
                </div>
                <button type="button">
                  Learn more
                  <svg fill="none" height="9" viewBox="0 0 7 9" width="7" xmlns="http://www.w3.org/2000/svg">
                    <path d="m1 8 4-3.5-4-3.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
            ))}
          </Box>
          <Box mt={3}>
            <button className={styles.subscribe} type="button">
              Subscribe
            </button>
          </Box>
        </DialogContent>
      </Dialog>
    </Backdrop>
  );
}
