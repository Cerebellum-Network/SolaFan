export type Order = {
  id: number;
  orderId: string;
  amount: string;
  price: string;
  cancelled: boolean;
  processed: boolean;
  creator: string;
  balance: string;
  royaltyFee: string;
  priceUsd: number;
};
