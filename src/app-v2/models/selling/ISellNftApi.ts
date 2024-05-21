export interface ISellNftApi {
  sellNft(nftAddress: string, price: number, amount: number, collectionAddress: string): Promise<string>;
  cancelNftSelling(orderId: string): Promise<void>;
}
