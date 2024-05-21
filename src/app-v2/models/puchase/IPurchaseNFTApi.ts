export interface IPurchaseNFTApi {
  purchaseNft(orderId: string, qty: number): Promise<number>;
}
