import {gql} from '@apollo/client';

export const CERE_EXCHANGE_RATE = gql`
  query ExchangeRate {
    creatorExchangeRate {
      cere_units_per_penny
    }
  }
`;
