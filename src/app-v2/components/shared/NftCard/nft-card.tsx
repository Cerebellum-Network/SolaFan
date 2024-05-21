import {Box, Typography} from '@material-ui/core';
import {selectAppConfig} from 'app-v2/redux/modules/app-config/selectors';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {generatePath, Link} from 'react-router-dom';

import {formatPriceUsd} from '../../../../shared/lib/formatNumber';
import {ROUTES} from '../../../constants/routes';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {UsersNftCardInterface} from '../../../types/nft';
import {NftCardCompositeButton} from '../../connected/ActionButton/NftCardCompositeButton';
import {ResponsiveImage} from '../../primitives/ResponsiveImage/responsive-image';
import {Badge} from '../Badge';
import {Condition, ConditionsList, Defaults} from '../Conditions';
import Share from '../Share';
import {getShareUrl} from '../Share/utils/get-share-url';
import limited from './limited-icon.svg';
import person from './person.svg';
import share from './share.svg';
import unlock from './unlock.svg';

type Props = {
  nft: UsersNftCardInterface;
  linkTo?: (nftId: string, locale: string) => string;
  buttonSize?: 'small' | 'medium' | 'large';
  userWalletAddress: string | null;
};

export function NftCard({nft, linkTo, buttonSize, userWalletAddress}: Props) {
  const {appTitle} = useSelector(selectAppConfig);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {t, locale} = useLocalization();
  const nftId = nft.id;
  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg md:w-full">
        <div className="relative">
          <Link to={linkTo?.(nftId, locale) || generatePath(ROUTES.NFT_PAGE, {nftId, locale})}>
            <div className="h-[200px] bg-gray-700 relative">
              <ResponsiveImage
                alt=""
                className="absolute left-0 w-full h-full right-0 object-cover"
                formats={nft.formats}
                size={400}
                fallbackUrl={nft.image}
              />
              <div className="absolute top-3 left-3 flex flex-col items-start gap-y-2">
                <div className="bg-gray-100 gap-x-1 rounded px-2 py-[2px] flex items-center">
                  <img className="relative -top-[1px]" src={limited} alt="" />
                  <Typography variant="caption">{t('Limited Collection')}</Typography>
                </div>
                {nft.purchaseStatus === 'USER_HAS_NFT' && <Badge text={t('Collected')} />}
              </div>
            </div>
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-3 right-3 w-[30px] h-[30px] bg-black rounded-full flex items-center justify-center"
            type="button"
          >
            <img src={share} alt="share" />
          </button>
        </div>
        <Box p={1} display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h3" noWrap>
            {nft.title}
          </Typography>
        </Box>
        <div className="mx-4 gap-x-2 text-[12px] grid grid-cols-2">
          <div className="bg-gray-100 p-2 h-16 rounded-md leading-4">
            <p className="text-[8px] font-medium flex gap-x-1 items-baseline uppercase">
              <img src={unlock} alt="" />
              {t('Unlocks')}
            </p>
            {nft.unlockingEvents && nft.unlockingEvents.length > 0 && (
              <>
                {nft.unlockingEvents.slice(0, 2).map((event, i) => (
                  <p key={event}>
                    {i + 1}. {event}
                  </p>
                ))}
                {nft.unlockingEvents.length > 2 && <p className="text-cyan-700">{t('See more')}</p>}
              </>
            )}
          </div>
          <div className="bg-gray-100 p-2 h-16 rounded-md leading-4">
            <p className="text-[8px] font-medium flex gap-x-1 items-baseline uppercase">
              <img src={person} alt="" />
              {t('Owners')}
            </p>
            <p>
              {nft.balance ?? 0} / {nft.supply}
            </p>
            {nft.purchaseStatus === 'USER_HAS_NFT' && <p className="text-green-600">{t('Owned by you')}</p>}
          </div>
        </div>
        <div className="flex my-4 mx-4 flex-col gap-y-2 text-sm">
          <ConditionsList>
            <Condition condition={nft.purchaseStatus === 'USER_HAS_NFT' || Number(nftId) === 26}>
              <Link
                to={generatePath(ROUTES.NFT_PAGE, {nftId, locale})}
                className="bg-[#fecb41] text-center rounded-xl py-3"
                type="button"
              >
                {t('View Collectible')}
              </Link>
              <div className="font-bold text-[10px] text-center">&nbsp;</div>
            </Condition>
            <Defaults>
              <NftCardCompositeButton
                nftId={nft.id}
                nftOrderId={nft.orderId!}
                nftSellingType={nft.sellingType}
                nftType={nft.nftType}
                nftQuantity={1}
                disabled={!Boolean('hasPendingTransaction')}
                buttonText={`Buy For $${formatPriceUsd(nft.priceUsd)}`}
                buttonSize={buttonSize}
                userWalletAddress={userWalletAddress}
              />
              <div className="text-[11px] text-center">{t('Buying this collectible will get you in the fanclub')}</div>
            </Defaults>
          </ConditionsList>
        </div>
        {isModalOpen && (
          <Share
            appTitle={appTitle}
            onClose={() => setIsModalOpen(false)}
            title={t('Share NFT')}
            description={nft.title}
            imgSrc={nft.image}
            url={getShareUrl(
              generatePath(ROUTES.NFT_PAGE, {nftId, locale}),
              nft.title,
              nft.description,
              nft.image ?? '',
            )}
          />
        )}
      </div>
    </div>
  );
}
