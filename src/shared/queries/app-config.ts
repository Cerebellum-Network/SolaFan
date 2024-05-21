import {gql} from '@apollo/client';

import {UPLOAD_FILE_FRAGMENT} from './fragments';

export const CMS_APP_CONFIG = gql`
  ${UPLOAD_FILE_FRAGMENT}
  query CmsAppConfig {
    cmsAppConfig {
      appTitle
      logoShort {
        ...Media
      }
      logoFull {
        ...Media
      }
      instagramUrl
      facebookUrl
      twitterUrl
      discordUrl
      faqUrl
      privacyPolicyUrl
      termsOfServicesUrl
      cereWalletTitle
      signUpCta
      isFiatPaymentDisabled
      primaryMainColor
      secondaryMainColor
      secondaryDarkColor
      buttonContainedPrimaryFirstColor
      buttonContainedPrimarySecondColor
      buttonContainedSecondaryColor
      infoMainColor
      backgroundPaperColor
      backgroundDefaultColor
      grey100Color
      grey700Color
    }
  }
`;
