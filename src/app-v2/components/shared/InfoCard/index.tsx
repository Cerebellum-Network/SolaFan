import {NftCardInterface} from '@cere/services-types';
import {Card, CardContent, CardMedia, makeStyles, Theme} from '@material-ui/core';
import {useCallback} from 'react';

import {InfoCardDetails} from './InfoCardDetails';

const useStyles = makeStyles((theme: Theme) => ({
  selectorNftRoot: {
    position: 'relative',
    overflow: 'unset',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, .12)',
    borderRadius: '12px',

    '--size': '164px',
    width: 'var(--size)',

    [theme.breakpoints.up('sm')]: {
      '--size': '208px',
    },
    [theme.breakpoints.up('lg')]: {
      '--size': '184px',
    },
  },

  cardMedia: {
    borderRadius: '12px 12px 0 0',
    width: 'var(--size)',
    height: 'var(--size)',
  },

  selectorNftContent: {
    padding: '0.5rem',

    '&:last-child': {
      paddingBottom: '0.5rem',
    },
  },
}));

type InfoCardProps = Pick<NftCardInterface, 'image' | 'title' | 'id'> & {
  onCardClick: (id: NftCardInterface['id']) => void;
  nftType?: NftCardInterface['nftType'];
  priceUsd?: NftCardInterface['priceUsd'];
};

export const InfoCard = ({id, image, title, nftType, priceUsd, onCardClick}: InfoCardProps) => {
  const classes = useStyles();

  const handleCardClick = useCallback(() => onCardClick(id), [id, onCardClick]);

  return (
    <Card classes={{root: classes.selectorNftRoot}} onClick={handleCardClick}>
      <CardMedia className={classes.cardMedia} image={image} />
      <CardContent classes={{root: classes.selectorNftContent}}>
        <InfoCardDetails
          // @TODO These hardcoded values will be removed after refactoring
          qtyOwned={1}
          hasBids={false}
          priceUsd={priceUsd}
          nftType={nftType}
          title={title}
        />
      </CardContent>
    </Card>
  );
};
