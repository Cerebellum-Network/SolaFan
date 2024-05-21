import {TOKEN_DECIMALS} from '../../../shared/lib/formatPrice';
import {ContractsProvider} from '../blockchain/ContractsProvider';
import {WalletConnectionService} from '../wallet/WalletConnectionService';

export class WalletsBalanceService {
  constructor(
    private readonly contractProvider: ContractsProvider,
    private readonly walletConnectionService: WalletConnectionService,
  ) {}

  async getWalletsBalance(): Promise<{[key: string]: number}> {
    const userWalletsAddresses = this.walletConnectionService.getConnectedWalletsAddresses();
    if (!userWalletsAddresses.length) {
      return {};
    }
    const erc20 = await this.contractProvider.getERC20Contract();
    console.debug('Fetching balances for', userWalletsAddresses);
    const balances = await Promise.all(
      userWalletsAddresses.map((address) =>
        erc20
          .balanceOf(address)
          .then((balance) => {
            console.debug('balance', address, balance.toString());
            return balance;
          })
          .catch((error) => {
            console.warn('failed to get balance', address, error.message);
            return undefined;
          }),
      ),
    );
    return userWalletsAddresses.reduce((acc, wallet, index) => {
      const balance = balances[index];
      if (balance != null) {
        try {
          acc[wallet] = Number(balance.div(TOKEN_DECIMALS.toString()).toString());
        } catch (e) {
          console.error('failed to parse balance', wallet, balance.toString());
        }
      }
      return acc;
    }, {} as {[key: string]: number});
  }
}
