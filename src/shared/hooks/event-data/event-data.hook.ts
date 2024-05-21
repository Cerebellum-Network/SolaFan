import {useQuery} from '@apollo/client';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';

import {PublicationState} from '../../types/cms-exhibit';
import {DeepPartial} from '../../types/deep-partial';
import {CmsCreator, CmsExhibitionWithTheme} from '../../types/graphql';
import {isRecord} from '../../types/is-record';
import {GET_EXHIBITIONS_BY_ALIAS} from './queries';

type Result = {
  event?: CmsExhibitionWithTheme;
  artist?: CmsCreator;
  isLoading: boolean;
  error: string | undefined;
  refetch: (variables?: {slug: string}) => Promise<unknown>;
  startPolling: (timeout: number) => void;
  stopPolling: () => void;
};

type CmsExhibitionVariables = {
  slug?: string;
  publicationState?: PublicationState;
  locale: string;
};

type PartialExhibition = Omit<DeepPartial<CmsExhibitionWithTheme>, 'slug'> & {
  slug?: string;
};

const isCmsExhibitionWithTheme = (event?: PartialExhibition): event is CmsExhibitionWithTheme =>
  isRecord(event) && event.nfts != null;

export const useFetchFullEventData = (exhibition?: PartialExhibition, isPreviewMode?: boolean): Result => {
  const {locale} = useLocalization();
  const slug = exhibition?.slug;
  const {
    data: response,
    loading,
    error,
    refetch,
    startPolling,
    stopPolling,
  } = useQuery<{cmsV2Exhibits: CmsExhibitionWithTheme[]}, CmsExhibitionVariables>(GET_EXHIBITIONS_BY_ALIAS, {
    variables: {
      slug,
      publicationState: isPreviewMode ? PublicationState.PREVIEW : PublicationState.LIVE,
      locale,
    },
    skip: !slug || isCmsExhibitionWithTheme(exhibition),
  });

  return {
    event: isCmsExhibitionWithTheme(exhibition) ? exhibition : response?.cmsV2Exhibits[0],
    isLoading: loading,
    error: error?.message,
    refetch,
    startPolling,
    stopPolling,
  };
};
