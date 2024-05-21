import {maticNetworkUrls, MaticTestnetIdEnum} from '../../constants/web3';

export const getMaticNetworkUrl = () => {
  const chainId = Number(process.env.REACT_APP_NETWORK_ID);
  return maticNetworkUrls[chainId as MaticTestnetIdEnum];
};
