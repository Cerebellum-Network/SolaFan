import {Deployment} from '@cere/freeport-sc-sdk';

import {APPLICATION, CONTRACTS_DEPLOYMENT} from '../../../config/common';
import {walletConnectionService} from '../wallet';
import {ContractsProvider} from './ContractsProvider';

export const contractProvider = new ContractsProvider(
  walletConnectionService,
  APPLICATION(),
  CONTRACTS_DEPLOYMENT as Deployment,
);
