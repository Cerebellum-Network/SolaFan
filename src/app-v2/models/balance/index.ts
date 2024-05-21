import {contractProvider} from '../blockchain';
import {walletConnectionService} from '../wallet';
import {WalletsBalanceService} from './WalletsBalanceService';

export const walletsBalanceService = new WalletsBalanceService(contractProvider, walletConnectionService);
