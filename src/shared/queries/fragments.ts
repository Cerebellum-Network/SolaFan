import {gql} from '@apollo/client';

export const UPLOAD_FILE_FRAGMENT = gql`
  fragment Media on UploadFile {
    alternativeText
    url
    formats
  }
`;
