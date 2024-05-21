import {gql} from '@apollo/client';

const videoPreview: string = `
  videoPreview {
    alternativeText
    caption
    formats
    id
    url
  }
`;
const teaser: string = `
  teaser {
    poster {
      url
      previewUrl
      alternativeText
    }
    description
    content {
      url
      previewUrl
      alternativeText
      id
    }
  }
`;
const localizations: string = `
  localizations {
    localizations {
      localizations {
        localizations {
          localizations {
            localizations {
              endsAt
              startsAt
            }
          }
        }
      }
    }
  }
`;
const assets: string = `
  assets {
    title
    description
    content {
      url
      id
      alternativeText
    }
    }
`;
const creator: string = `
  creator {
    id
    created_at
    updated_at
    name
    avatar {
      url
      alternativeText
    }
    desktopBackgroundImage {
      alternativeText
      url
    }
    tabletBackgroundImage {
      url
      alternativeText
    }
    mobileBackgroundImage {
      url
      alternativeText
    }
    about
    facebookFollowerNumber
    twitterFollowerNumber
    instagramFollowerNumber
    discordLink
    youtubeFollowerNumber
    tiktokFollowerNumber
    seoTitle
    seoDescription
    seoCanonical
    seoImage {
      alternativeText
      url
    }
    emailImage {
      url
    }
    freeportWallet {
      id
    }
    locale
    published_at
  }
`;
const liveTeaser: string = `
   liveTeaser {
      content {
        url
        alternativeText
      }
      poster {
        alternativeText
        url
      }
      }
`;

export const EVENT = gql`
  query Exhibit($slug: String, $publicationState: PublicationState, $locale: String) {
    cmsV2Exhibits(where: {slug: $slug}, publicationState: $publicationState, locale: $locale) {
      isComingSoon
      ${videoPreview}
      title
      ${teaser}
      subtitle
      startsAt
      shortDescription
      seoTitle
      seoCanonical
      seoDescription
      seoImage {
        alternativeText
        url
        previewUrl
      }
     nfts {
        cmsNft {
          title
          description
          cardImage {
            url
            alternativeText
          }
          cardDescription
          id
          freeportNft {
            orders {
              orderId
              price
              amount
            }
            nftId
          }
        }
        relType
      }
      ${localizations}
      allowFreeAccess
      ${assets}
      ${creator}
      endsAt
      ${liveTeaser}
      live_theme {
        background {
          alternativeText
          url
          id
        }
      }
      image {
        url
        alternativeText
      }
      slug
      id
      description
    }
  }
`;
