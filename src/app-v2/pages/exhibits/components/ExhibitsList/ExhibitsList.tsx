import {NftCardInterface} from '@cere/services-types';
import {Condition, ConditionsList, Defaults} from 'app-v2/components/shared/Conditions';
import {sortBy} from 'lodash';
import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useStore} from 'react-redux';
import useSWR from 'swr';

import {nftsApi} from '../../../../api';
import {EventCard} from '../../../../components/shared/EventCard/event-card';
import {useLocalization} from '../../../../hooks/use-locale.hook';
import {NftsDocument} from '../../../../redux/modules/nfts/actions';
import {selectNftByCmsNftId} from '../../../../redux/modules/nfts/selectors';
import {CmsExhibit} from '../../../../types/exhibit';
import {UsersNftCardInterface} from '../../../../types/nft';

type Props = {
  exhibits: CmsExhibit[];
  onShareClick: (id: string) => void;
};

const isNftCardInterface = (
  v: UsersNftCardInterface | NftCardInterface | CmsExhibit | undefined,
): v is NftCardInterface => v != null;

export const ExhibitsList = ({exhibits}: Props) => {
  const {t, locale} = useLocalization();
  const dispatch = useDispatch();
  const store = useStore();

  const eventNftsMap = useMemo(() => {
    const eventsMap = new Map<string, number[]>();
    exhibits.forEach((event) => {
      eventsMap.set(
        event.id,
        event.nfts.map(({cmsNft}) => cmsNft.id),
      );
    });
    return eventsMap;
  }, [exhibits]);

  const nftIds = exhibits.flatMap((event) => event.nfts.map(({cmsNft}) => cmsNft.id));
  const uniqueIdsQuery = useMemo(() => {
    const state = store.getState() as any;
    const notLoadedNftCmsIds = sortBy(Array.from(new Set(nftIds))).filter(
      (cmsNftId) => selectNftByCmsNftId(state, {cmsNftId}) == null,
    );
    return notLoadedNftCmsIds.join(',');
  }, [nftIds, store]);

  const {data: nfts} = useSWR(
    uniqueIdsQuery === '' ? null : [`nft-id-${uniqueIdsQuery}`, uniqueIdsQuery],
    async ([_, query]) => {
      return nftsApi.getAllNfts({ids: query.split(','), locale});
    },
  );

  useEffect(() => {
    if (nfts) {
      dispatch(NftsDocument.create(nfts.filter(isNftCardInterface)));
    }
  }, [dispatch, nfts]);

  const getNftsForEvent = useCallback(
    (id: string): UsersNftCardInterface[] => {
      const state = store.getState() as any;
      const cmsNftIds = eventNftsMap.get(id) ?? [];
      return cmsNftIds
        .map((cmsNftId) => selectNftByCmsNftId(state, {cmsNftId}))
        .filter(Boolean) as UsersNftCardInterface[];
    },
    [eventNftsMap, store],
  );

  return (
    <div className="pt-2 py-8">
      <ConditionsList>
        <Condition condition={exhibits.length > 0}>
          <div className="grid gap-4 md:gap-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {exhibits.map((exhibit) => (
              <div key={exhibit.id}>
                <EventCard className="w-full lg:w-[328px]" nfts={getNftsForEvent(exhibit.id)} event={exhibit} />
              </div>
            ))}
          </div>
        </Condition>
        <Defaults>
          <h4 className="text-center text-lg mx-auto w-[400px]">{t('No events found')}</h4>
        </Defaults>
      </ConditionsList>
    </div>
  );
};
