import {gql} from '@apollo/client';

import {UPLOAD_FILE_FRAGMENT} from './fragments';

export const GET_EXHIBITIONS_NOTIFICATIONS_DATA = gql`
  ${UPLOAD_FILE_FRAGMENT}
  query getExhibits($ids: [ID]!) {
    cmsV2Exhibits(where: {id_in: $ids}) {
      id
      title
      slug
      image {
        ...Media
      }
    }
  }
`;

export const GET_NFTS_NOTIFICATIONS_DATA = gql`
  ${UPLOAD_FILE_FRAGMENT}
  query getNfts($ids: [ID]!) {
    cmsV2Nfts(where: {id_in: $ids}) {
      id
      title
      assets {
        content {
          ...Media
        }
      }
      cardImage {
        ...Media
      }
    }
  }
`;
