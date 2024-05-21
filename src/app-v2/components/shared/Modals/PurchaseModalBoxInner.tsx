import {Box, makeStyles} from '@material-ui/core';
import {memo, ReactElement} from 'react';

import {mobileLandscapeMediaQuery} from '../../../styles/mediaQueries';

export const useStyles = makeStyles((theme) => ({
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row',
      gap: '6%',
    },
  },
  infoElement: {
    [mobileLandscapeMediaQuery(theme)]: {
      maxWidth: '47%',
      minWidth: '47%',
    },
  },
  additionalInfoBlock: {
    '&:not(:empty)': {
      paddingTop: '16px',
    },
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    paddingTop: '16px',
    [mobileLandscapeMediaQuery(theme)]: {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start',
    },
  },
}));

type Props = {
  renderNftCardAndUserWallet: () => ReactElement;
  renderNftPriceInfo: () => ReactElement;
  renderAdditionalInfoBlock?: () => ReactElement;
  renderButtons: () => ReactElement;
};

export const PurchaseModalBoxInner = memo(
  ({renderNftCardAndUserWallet, renderNftPriceInfo, renderAdditionalInfoBlock, renderButtons}: Props) => {
    const styles = useStyles();

    return (
      <Box>
        <Box className={styles.infoContainer}>
          <Box className={styles.infoElement}>{renderNftCardAndUserWallet()}</Box>
          <Box className={styles.infoElement}>{renderNftPriceInfo()}</Box>
        </Box>
        {renderAdditionalInfoBlock && <Box className={styles.additionalInfoBlock}>{renderAdditionalInfoBlock()}</Box>}
        <Box className={styles.buttonsBox}>{renderButtons()}</Box>
      </Box>
    );
  },
);
