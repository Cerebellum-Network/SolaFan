import {Button, CircularProgress, makeStyles, Typography} from '@material-ui/core';
import * as EmailValidator from 'email-validator';
import {ChangeEvent, memo, useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

import {formatNumber} from '../../../../../shared/lib/formatNumber';
import analyticService, {AnalyticEventsEnum} from '../../../../../shared/services/analytic.service';
import {ROUTES} from '../../../../constants/routes';
import {UsersNftCardInterface} from '../../../../types/nft';
import AuthInput from '../../../primitives/AuthInput';
import {ResponsiveImage} from '../../../primitives/ResponsiveImage/responsive-image';
import {StyledLink} from '../../../primitives/StyledLink';
import {PurchaseNftModalBox} from '../PurchaseNftModalBox';

type Props = {
  qty: number;
  onClose: () => void;
  onSubmit: (qty: number, email: string) => void;
  nft?: UsersNftCardInterface;
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '400px',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '500px!important',
    },
  },
}));

export const BuyCollectibleModal = memo(({nft, qty, onClose, onSubmit}: Props) => {
  const {t, i18n} = useTranslation();
  const [quantity, setQuantity] = useState<number>(qty);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isProcessing, setProcessing] = useState<boolean>(false);

  const image = nft?.image;
  const title = nft?.title;
  const nftLink = useMemo(
    () => generatePath(ROUTES.NFT_PAGE, {nftId: nft?.id, locale: i18n.language}),
    [nft, i18n.language],
  );
  const priceUSDC = nft?.priceUsd || 0;

  const styles = useStyles();

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const onBlur = useCallback(() => {
    if (!email || !EmailValidator.validate(email)) {
      setError(t('Please enter a valid email address'));
    }
  }, [email, t]);

  const onFocus = useCallback(() => {
    analyticService.track(AnalyticEventsEnum.EMAIL_SUBMITTED);
    setError('');
  }, []);

  const handleOnSubmit = useCallback(() => {
    setProcessing(true);
    onSubmit(quantity, email);
    onClose();
  }, [email, onClose, onSubmit, quantity]);

  return (
    <PurchaseNftModalBox
      title={t('Buy Collectible')}
      subTitle={t('After clicking the “Continue” button, you will be redirected to Stripe to complete the purchase')}
      onClose={onClose}
      classes={{root: styles.root}}
    >
      <>
        <div className="bg-gray-200 gap-x-3 flex items-center rounded-xl p-2">
          <StyledLink to={nftLink}>
            <ResponsiveImage
              alt={title}
              size={60}
              fallbackUrl={image ?? ''}
              className="w-[60px] h-[60px] rounded object-cover"
            />
          </StyledLink>
          <div>
            <h4>{title}</h4>
            <div className="gap-x-3 flex items-center">
              <div>
                {t('Price')} <span className="font-bold">{formatNumber(priceUSDC)} USDC</span>
              </div>
              <div className="flex items-center gap-x-2">
                <span>
                  {t('Quantity')}: <span className="font-bold inline-block min-w-4">{quantity}</span>
                </span>
                <button
                  disabled={quantity <= 1}
                  className="w-[20px] h-[20px] bg-gray-300 disabled:text-gray-400 rounded flex items-center justify-center"
                  onClick={() => setQuantity((v) => (v > 1 ? v - 1 : 1))}
                >
                  -
                </button>
                <button
                  className="w-[20px] h-[20px] bg-gray-300 disabled:text-gray-400 rounded flex items-center justify-center"
                  onClick={() => setQuantity((v) => v + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <AuthInput
            value={email}
            helperText={error}
            inputProps={{inputMode: 'email'}}
            onChange={handleOnChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        <div className="my-4">
          <Typography variant="body2" className="mt-4">
            {t('Please use an email address you have access to, as your DaVinci Account will be created with it')}
          </Typography>
        </div>
        <Button
          className="mt-4"
          fullWidth
          variant="contained"
          disabled={!!error || isProcessing}
          onClick={handleOnSubmit}
        >
          {isProcessing ? <CircularProgress size={30} /> : t('Continue')}
        </Button>
      </>
    </PurchaseNftModalBox>
  );
});

BuyCollectibleModal.displayName = 'BuyCollectibleModal';
