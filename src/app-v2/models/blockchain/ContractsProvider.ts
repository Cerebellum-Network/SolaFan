import {
  ApplicationEnum,
  createERC20MockToken as createERC20,
  createFreeportCollection,
  createMarketplace,
  Deployment,
  ERC20MockToken as ERC20,
  FreeportCollection,
  getERC20Address,
  getMarketplaceAddress,
  Marketplace,
} from '@cere/freeport-sc-sdk';

import {WalletConnectionService} from '../wallet/WalletConnectionService';

export class ContractsProvider {
  constructor(
    private readonly walletConnectionService: WalletConnectionService,
    private readonly application: ApplicationEnum,
    private readonly contractsDeployment: Deployment,
  ) {}

  async getERC20Contract(): Promise<ERC20> {
    const signer = await this.walletConnectionService.getSigner();
    const contractAddress = await getERC20Address(signer.provider, this.contractsDeployment, this.application);

    return createERC20({signer, contractAddress});
  }

  async getSignerAddress() {
    const signer = await this.walletConnectionService.getSigner();
    return signer.getAddress();
  }

  async getMarketplaceContract(): Promise<Marketplace> {
    const signer = await this.walletConnectionService.getSigner();
    const contractAddress = await getMarketplaceAddress(signer.provider, this.contractsDeployment, this.application);
    return createMarketplace({signer, contractAddress});
  }

  async createFreeportCollection(collectionAddress: string): Promise<FreeportCollection> {
    const signer = await this.walletConnectionService.getSigner();

    return createFreeportCollection({signer, contractAddress: collectionAddress});
  }
}
