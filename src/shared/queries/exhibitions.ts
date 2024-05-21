import {gql} from '@apollo/client';

import {ARTIST_PROFILE_FRAGMENT} from './artists';
import {EXHIBITION_MAIN, EXHIBITION_STAY_UPDATED} from './exhibitions-fragments';
import {NFT_FRAGMENT} from './nfts';

export const FULL_EXHIBITION = gql`
  ${ARTIST_PROFILE_FRAGMENT}
  ${EXHIBITION_STAY_UPDATED}
  ${EXHIBITION_MAIN}
  ${NFT_FRAGMENT}
  fragment CmsFullExhibition on CmsV2Exhibit {
    ...ExhibitionMain
    ...ExhibitionStayUpdated
    creator {
      ...ArtistProfile
    }
    nfts {
      id
      cmsNft {
        ...nftFragment
      }
      videoMarkers {
        markerStartTime
        markerEndTime
      }
      relType
      availableFrom
      availableTo
    }
  }
`;
