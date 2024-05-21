import {Box, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {memo, ReactNode} from 'react';

import {PriceSubTitle} from './PriceSubTitle';
import {useExclusiveCardStyles} from './styles';

type Props = {
  title: string;
  image?: string;
  renderSubTitle: () => NonNullable<ReactNode>;
  isAuction: boolean;
  bidsLength?: number;
  priceUSD: number;
  renderActionElement: () => NonNullable<ReactNode>;
  onClick: () => void;
  isSmall?: boolean;
  isSelected?: boolean;
};

export const ExclusiveCard = memo(
  ({
    title,
    image,
    renderSubTitle,
    isAuction,
    bidsLength,
    priceUSD,
    renderActionElement,
    onClick,
    isSmall,
    isSelected,
  }: Props) => {
    const styles = useExclusiveCardStyles();

    return (
      <Box className={clsx(styles.root, isSmall && styles.rootSmall, isSmall && isSelected && styles.rootSelected)}>
        <Box className={clsx(styles.imageBox, isSmall && styles.imageBoxSmall)} onClick={onClick}>
          <img src={image} alt="" className={styles.image} />
        </Box>
        <Box className={styles.infoBox}>
          <Box>
            <Typography className={clsx(styles.title, isSmall && styles.titleSmall)} onClick={onClick}>
              {title}
            </Typography>
            <Box onClick={onClick}>{renderSubTitle()}</Box>
          </Box>
          <Box className={clsx(styles.secondInfoBox, isSmall && styles.secondInfoBoxSmal)}>
            <Box onClick={onClick}>
              <PriceSubTitle isAuction={isAuction} bidsLength={bidsLength} />
              <Typography className={clsx(styles.price, isSmall && styles.priceSmall)}>
                ${priceUSD?.toFixed(2)}
              </Typography>
            </Box>
            <Box className={clsx(styles.actionButton, isSmall && styles.actionButtonSmall)}>
              {renderActionElement()}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  },
);
