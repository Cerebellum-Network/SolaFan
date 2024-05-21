import {gql} from '@apollo/client';

import {UPLOAD_FILE_FRAGMENT} from './fragments';

export const EXHIBITION_BASE_PROPS = gql`
  fragment ExhibitionBaseProps on CmsV2Exhibit {
    id
    startsAt
    endsAt
    title
    slug
    subtitle
    description
    allowFreeAccess
    ticketModalTitle
    ticketModalBody
    nftVisualExhibit
    NFT_visual_exhibitupload {
      url
    }
    isComingSoon
    locale
    localizations {
      id
      slug
      locale
    }
  }
`;
export const EXHIBITION_MAIN = gql`
  ${UPLOAD_FILE_FRAGMENT}
  ${EXHIBITION_BASE_PROPS}
  fragment ExhibitionMain on CmsV2Exhibit {
    ...ExhibitionBaseProps
    videoPreview {
      ...Media
    }
    image {
      ...Media
    }
    creator {
      id
      name
      avatar {
        ...Media
      }
    }
    nfts {
      availableFrom
      availableTo
      id
      relType
    }
    assets {
      content {
        ...Media
      }
    }
    teaser {
      title
      description
      poster {
        ...Media
      }
      content {
        ...Media
      }
    }
    liveTeaser {
      title
      description
      poster {
        ...Media
      }
      content {
        ...Media
      }
    }
    seoTitle
    seoDescription
    seoCanonical
    seoImage {
      ...Media
    }
  }
`;

export const EXHIBITION_STAY_UPDATED = gql`
  fragment ExhibitionStayUpdated on CmsV2Exhibit {
    artistQuoteVisual {
      url
    }
    artistQuote
  }
`;
