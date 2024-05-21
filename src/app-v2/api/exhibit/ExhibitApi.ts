import {ExhibitCardInterface} from '@cere/services-types';

import {PublicationState} from '../../../shared/types/cms-exhibit';
import {CmsExhibit, ExhibitInterface} from '../../types/exhibit';
import {isExhibit} from '../../utils/type-guards/exhibit';
import {IRESTClient} from '../api-clients/IRESTClient';
import {EventFetchError, MoreExhibitsFetchError} from './ExhibitFetchErrors';
import {IExhibitApi} from './IExhibitApi';

const mapEventResponse = (event: ExhibitInterface | undefined): CmsExhibit | undefined => {
  if (!event) {
    return;
  }
  return {
    id: event.id,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    title: event.title,
    slug: event.slug,
    subtitle: event.subtitle,
    description: event.description,
    allowFreeAccess: event.allowFreeAccess,
    image: event.image,
    teaser: event.teaser,
    creator: event.creator,
    locale: event.locale,
    liveTeaser: event.liveTeaser,
    videoPreview: event.videoPreview,
    localizations: event.localizations,
    live_theme: event.liveTheme,
    assets: event.assets,
    attendees: event.attendees,
    approvedAttendees: event.approvedAttendees,
    eventType: event.eventType,
    eventHiddenLocation: event.eventHiddenLocation,
    eventPublicLocation: event.eventPublicLocation,
    streamUrl: event.streamUrl,
    nfts: event.nfts as any[],
  };
};

export const createExhibitApi = (restClient: IRESTClient): IExhibitApi => {
  const getEvent = async (slug: string, isPreviewMode: boolean, locale: string): Promise<CmsExhibit | undefined> => {
    try {
      const event = await restClient.makeRequest<ExhibitInterface>(
        'get',
        `exhibits/${slug}/?preview_key=${
          isPreviewMode ? PublicationState.PREVIEW : PublicationState.LIVE
        }&locale=${locale}`,
        () => true,
      );
      return mapEventResponse(event);
    } catch (error) {
      console.error(error);
      throw new EventFetchError();
    }
  };

  const getCreatorExhibits = async (creatorId: string, locale: string): Promise<ExhibitCardInterface[] | undefined> => {
    try {
      return await restClient.makeRequest<ExhibitCardInterface[]>(
        'get',
        `creators/${creatorId}/exhibits/?locale=${locale}`,
        isExhibit,
      );
    } catch (error) {
      console.error(error);
      throw new MoreExhibitsFetchError();
    }
  };

  return {
    getEvent,
    getCreatorExhibits,
  };
};
