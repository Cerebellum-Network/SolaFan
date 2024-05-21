import {gql} from '@apollo/client';

import {FULL_EXHIBITION} from '../../queries';

export const GET_EXHIBITIONS_BY_ALIAS = gql`
  ${FULL_EXHIBITION}
  query Exhibit($slug: String, $publicationState: PublicationState, $locale: String) {
    cmsV2Exhibits(where: {slug: $slug}, publicationState: $publicationState, locale: $locale) {
      ...CmsFullExhibition
      live_theme {
        background {
          url
          alternativeText
          formats
          caption
        }
      }
    }
  }
`;
