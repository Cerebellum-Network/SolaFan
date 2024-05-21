export enum MaticTestnetIdEnum {
  AmoyTestnetNetworkId = 80_002,
  MaticMainnetNetworkId = 137,
}

export const maticNetworkNames = {
  [MaticTestnetIdEnum.AmoyTestnetNetworkId]: 'Amoy Testnet',
  [MaticTestnetIdEnum.MaticMainnetNetworkId]: 'Matic Mainnet',
};

export const maticNetworkUrls = {
  [MaticTestnetIdEnum.AmoyTestnetNetworkId]: 'https://rpc-amoy.polygon.technology/',
  [MaticTestnetIdEnum.MaticMainnetNetworkId]: 'https://polygonscan.com/',
};
