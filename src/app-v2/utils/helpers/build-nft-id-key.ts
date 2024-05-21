export const buildNftIdKey = (nft: {address: string; collectionAddress?: string}) =>
  `${nft.collectionAddress ?? 'collectionAddress'}::${nft.address}`;
