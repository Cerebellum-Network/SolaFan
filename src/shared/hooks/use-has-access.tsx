import {useMediaClient} from '@cere/media-sdk-react';
import {CheckUserHasNftEnum} from '@cere/services-types/dist/types';
import {useEffect, useState} from 'react';

import {walletConnectionService} from '../../app-v2/models/wallet';
import {DdcContentService} from '../../services/ddc-content-service';

export interface UseHasAccessProps {
  collectionAddress: string;
  nftId: number;
  nftPurchaseStatus?: CheckUserHasNftEnum;
  userWalletAddress: string | null;
}

export interface UseHasAccessReturn {
  hasAccess: boolean;
}

export const useHasAccess = ({collectionAddress, nftId, nftPurchaseStatus, userWalletAddress}: UseHasAccessProps) => {
  const {client} = useMediaClient();
  const [isChecking, setChecking] = useState<boolean>(true);

  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const getAccess = async () => {
      console.log('Checking access');
      if (!collectionAddress || !nftId || nftPurchaseStatus !== 'USER_HAS_NFT') {
        setChecking(false);
        return;
      }

      setChecking(true);
      try {
        const signer = userWalletAddress ? await walletConnectionService.getSigner() : undefined;
        if (signer) {
          const hasAccess = await DdcContentService.getHasAccess({signer, collectionAddress, nftId});
          setHasAccess(hasAccess);
        }
      } catch (e) {
        console.error('Error checking access', e);
      }
      setChecking(false);
    };
    getAccess();
  }, [collectionAddress, userWalletAddress, nftId, nftPurchaseStatus, client]);

  return {hasAccess, isChecking};
};
