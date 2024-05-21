import {ChainId, Deployment, getContractAddress} from '@cere/freeport-sc-sdk';
import {APPLICATION} from 'config/common';

const CONTRACT_NAME = 'Freeport';

export const getSmartContractAddress = () =>
  getContractAddress({
    deployment: (process.env.REACT_APP_ENV || 'dev') as Deployment,
    contractName: CONTRACT_NAME,
    chainId: Number(process.env.REACT_APP_NETWORK_ID) as ChainId,
    application: APPLICATION(),
  });
