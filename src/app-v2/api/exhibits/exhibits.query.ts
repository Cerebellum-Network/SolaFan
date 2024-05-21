import {gql} from '@apollo/client';
export const EXHIBITS = gql`
  query Exhibit($limit: Int, $locale: String) {
    exhibits: cmsV2HomePages(limit: $limit, locale: $locale) {
      seoTitle
      seoDescription
      seoCanonical
      seoImage {
        url
        alternativeText
        formats
        caption
      }
    }
  }
`;
