import {Box, Button, Divider, makeStyles} from '@material-ui/core';
import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {mobileLandscapeMediaQuery} from '../../../../styles/mediaQueries';
import {CopyBox} from '../../../primitives/CopyBox';
import {NftModalHighlightCard} from '../../../primitives/NftModalHighlightCard';
import {NftModalValueBlock} from '../../../primitives/NftModalValueBlock';
import {StyledLink} from '../../../primitives/StyledLink';
import {ReactComponent as SuccessIcon} from '../assets/success.svg';
import {PurchaseModalBox} from '../PurchaseModalBox';
import {PurchaseModalBoxInner} from '../PurchaseModalBoxInner';

const useStyles = makeStyles((theme) => ({
  hideOnMobileLandscape: {
    [mobileLandscapeMediaQuery(theme)]: {
      display: 'none',
    },
  },
  netSalesTitle: {
    color: theme.palette.text.primary,
  },
}));

type Props = {
  image?: string;
  title?: string;
  nftLink: string;
  nftAddress?: string;
  priceUSDC: number;
  quantity: number;
  royalties: number;
  onClose: () => void;
};

export const SellSuccessModal = memo(
  ({image, title, quantity, nftLink, nftAddress, priceUSDC, royalties, onClose}: Props) => {
    const {t} = useTranslation();
    const styles = useStyles();

    const netSales = priceUSDC - priceUSDC * royalties;

    const renderNftCardAndUserWallet = useCallback(
      () => (
        <>
          {image && title && (
            <StyledLink to={nftLink}>
              <NftModalHighlightCard image={image} title={title} />
            </StyledLink>
          )}
          {nftAddress && (
            <Box pt="16px">
              <CopyBox title={t('Collectible ID')} copiedText={nftAddress} />
            </Box>
          )}
        </>
      ),
      [title, image, nftAddress, nftLink, t],
    );

    const renderNftPriceInfo = useCallback(
      () => (
        <>
          <Divider className={styles.hideOnMobileLandscape} />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock title={t('Quantity')} value={quantity.toString()} />
          </Box>
          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock title={t('Offer')} value={`${priceUSDC.toFixed(2)} USDC`} />
          </Box>

          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock title={t('Royalties')} value={`${royalties.toFixed(2)} USDC`} />
          </Box>

          <Divider />
          <Box pb="8px" pt="16px">
            <NftModalValueBlock
              title={t('Net sales')}
              value={`${netSales.toFixed(2)} USDC `}
              subValue={`(~${netSales.toFixed(2)} USD)`}
              classes={{title: styles.netSalesTitle}}
            />
          </Box>
        </>
      ),
      [styles.hideOnMobileLandscape, styles.netSalesTitle, t, quantity, priceUSDC, royalties, netSales],
    );

    const renderButtons = useCallback(
      () => (
        <Button variant="outlined" fullWidth onClick={onClose}>
          {t('Ok')}
        </Button>
      ),
      [onClose, t],
    );

    return (
      <PurchaseModalBox
        icon={<SuccessIcon />}
        title={t('Listing confirmed')}
        subTitle={t(
          'Your collectible is listed for sale on DaVinci. You will be notified once the transaction is processed.',
        )}
        onClose={onClose}
      >
        <PurchaseModalBoxInner
          renderNftCardAndUserWallet={renderNftCardAndUserWallet}
          renderNftPriceInfo={renderNftPriceInfo}
          renderButtons={renderButtons}
        />
      </PurchaseModalBox>
    );
  },
);
