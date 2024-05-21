import {gql} from '@apollo/client';

import {EXHIBITION_MAIN} from './exhibitions-fragments';
import {UPLOAD_FILE_FRAGMENT} from './fragments';

export const ARTIST_PROFILE_FRAGMENT = gql`
  ${UPLOAD_FILE_FRAGMENT}
  fragment ArtistProfile on CmsV2Creator {
    id
    name
    about
    instagramFollowerNumber
    facebookFollowerNumber
    twitterFollowerNumber
    youtubeFollowerNumber
    tiktokFollowerNumber
    discordLink
    desktopBackgroundImage {
      ...Media
    }
    tabletBackgroundImage {
      ...Media
    }
    mobileBackgroundImage {
      ...Media
    }
    avatar {
      ...Media
    }
    seoTitle
    seoDescription
    seoCanonical
    seoImage {
      ...Media
    }
    locale
    localizations {
      id
      locale
    }
  }
`;

export const GET_ARTISTS = gql`
  ${ARTIST_PROFILE_FRAGMENT}
  query Artists($limit: Int, $locale: String) {
    artists: cmsCreators(limit: $limit, sort: "name:DESC", locale: $locale) {
      ...ArtistProfile
    }
  }
`;

export const GET_ARTIST = gql`
  ${EXHIBITION_MAIN}
  ${ARTIST_PROFILE_FRAGMENT}
  query Artist($id: ID!) {
    artist: cmsV2Creator(id: $id) {
      ...ArtistProfile
      exhibits {
        ...ExhibitionMain
      }
    }
  }
`;
