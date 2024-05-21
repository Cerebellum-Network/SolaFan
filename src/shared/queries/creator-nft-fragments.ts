import {gql} from '@apollo/client';

export const CREATOR_NFT_BASE_PROPS = gql`
  fragment CreatorNftBaseProps on CreatorNft {
    id
    minter
    supply
    nft_id
    collection_address
  }
`;
