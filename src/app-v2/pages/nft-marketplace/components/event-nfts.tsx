import {Box, Typography} from '@material-ui/core';
import {ArrowForward} from '@material-ui/icons';
import {FC} from 'react';
import {connect} from 'react-redux';
import {generatePath, Link} from 'react-router-dom';

import {isHasSuccessTransactions} from '../../../../shared/helpers/paymentStatus';
import {ROUTES} from '../../../constants/routes';
import {useLocalization} from '../../../hooks/use-locale.hook';
import {createSelectExhibitNfts} from '../../../redux/modules/exhbit-page/selectors';
import {selectExhibitBySlug} from '../../../redux/modules/exhibits/selectors';
import {CmsExhibit} from '../../../types/exhibit';

type Props = {
  event?: CmsExhibit;
  nfts: {
    image?: string;
    unlocked: boolean;
    title?: string;
    balance?: number;
    supply?: number;
  }[];
  locked: boolean;
};

const EventNfts: FC<Props> = ({event, nfts}) => {
  const {locale} = useLocalization();
  return (
    <Link to={event == null ? undefined : generatePath(ROUTES.EVENT, {exhibitSlug: event.slug, locale})}>
      <Box display="flex" alignItems="center" gridGap="12px">
        {event && (
          <Box>
            <img
              src={event.image.url}
              alt={event.title}
              style={{height: '100px', maxWidth: '100px', borderRadius: '4px', objectFit: 'cover'}}
            />
          </Box>
        )}
        <Box flex={1} height="100px">
          <Typography variant="subtitle1">{event?.title}</Typography>
          <Box display="flex" flexWrap="nowrap">
            {nfts.map((nft, index) => (
              <Box
                key={index}
                mt={1}
                minWidth="60px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                <Box
                  position="absolute"
                  width="100%"
                  height="16px"
                  zIndex={0}
                  style={{backgroundColor: nft.unlocked ? '#B0F41F' : '#f0f0f0', borderRadius: '4px'}}
                />
                <img
                  src={nft.image}
                  alt={`NFT ${index + 1}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    objectFit: 'cover',
                    zIndex: 1,
                    opacity: nft.unlocked ? 1 : 0.7,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <ArrowForward />
      </Box>
    </Link>
  );
};

const mapStateToProps = (store: any, {eventSlug}: {eventSlug: string}) => {
  const selectExhibitNfts = createSelectExhibitNfts();
  const event = selectExhibitBySlug(store, eventSlug);
  const nftIds = event?.nfts?.map(({id}) => id);
  const nfts = (selectExhibitNfts(store, nftIds) || [])
    .map((nft) => {
      return {
        image: nft.image,
        unlocked: isHasSuccessTransactions(nft),
        title: nft.title,
        balance: nft.balance,
        supply: nft.supply,
      };
    })
    .sort((a, b) => Number(b.unlocked) - Number(a.unlocked));

  const locked = !nfts.every(({unlocked}) => unlocked);
  return {event, nfts, locked};
};

export const ConnectedEventNfts = connect(mapStateToProps)(EventNfts);
