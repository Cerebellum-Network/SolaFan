import {Deployment, MediaClientOptions, Tenant} from '@cere/media-sdk-client';
import {MediaSdkClientProvider} from '@cere/media-sdk-react';
import {walletConnectionService} from 'app-v2/models/wallet';
import {DEPLOYMENT} from 'config/common';
import {detectTenant} from 'shared/services/tenant-utils';
import useSwr from 'swr';

interface MarketplaceMediaSdkProviderProps {
  children: React.ReactNode;
}

export const MarketplaceMediaSdkProvider = ({children}: MarketplaceMediaSdkProviderProps) => {
  const {data: signer} = useSwr(['media-client-signer'], () => walletConnectionService.getSigner());

  const options: MediaClientOptions = {
    deployment: remapEnvironment(DEPLOYMENT.toLowerCase()) as Deployment,
    tenant: detectTenant().toLowerCase() as Tenant,
    logger: true,
  };

  if (!signer) {
    return <>{children}</>;
  }

  return (
    <MediaSdkClientProvider signer={signer} options={options}>
      {children}
    </MediaSdkClientProvider>
  );
};

const remapEnvironment = (env: string): Deployment => {
  switch (env) {
    case 'dev':
      return 'development';
    case 'stage':
      return 'staging';
    case 'prod':
      return 'production';
    default:
      return env as Deployment;
  }
};
