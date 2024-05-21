import {gql} from '@apollo/client';

export const GET_APP_CONFIG = gql`
  query CmsAppConfig {
    appConfig: cmsAppConfig {
      appTitle
      logoShort {
        alternativeText
        url
        formats
      }
      logoFull {
        alternativeText
        url
        formats
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
