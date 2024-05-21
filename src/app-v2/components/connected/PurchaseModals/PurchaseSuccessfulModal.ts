import {ChainId, Deployment, getContractAddress} from '@cere/freeport-sc-sdk';
import {connect} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {Dispatch} from 'redux';

import {APPLICATION, ENV, NETWORK_ID} from '../../../../config/common';
import {maticNetworkUrls, MaticTestnetIdEnum} from '../../../../shared/services/web3';
import {ROUTES} from '../../../constants/routes';
import {selectCurrentLocale} from '../../../redux/modules/localization/selectors';
import {CloseActiveModalCommand} from '../../../redux/modules/modals/actions';
import {selectNftById} from '../../../redux/modules/nfts/selectors';
import {PurchaseSuccessModal} from '../../shared/Modals/Purchase/PurchaseSuccessModal';

type ModalProps = {
  nftId: string;
  price: number;
  qty: number;
};

const mapStateToProps = (state: any, {nftId, price, qty}: ModalProps) => {
  const nft = selectNftById(state, nftId);
  const locale = selectCurrentLocale(state);
  const networkUrl = maticNetworkUrls[NETWORK_ID as MaticTestnetIdEnum];
  const contractAddress = getContractAddress({
    deployment: (ENV || 'dev') as Deployment,
    contractName: 'Marketplace',
    chainId: NETWORK_ID as ChainId,
    application: APPLICATION(),
  });
  return {
    image: nft?.image,
    creatorName: nft?.creatorName,
    title: nft?.title,
    nftLink: generatePath(ROUTES.NFT_PAGE, {nftId: nftId, locale}),
    nftAddress: nft?.address,
    quantity: qty,
    priceUSDC: price,
    transitionDetailsLink: `${networkUrl}address/${contractAddress}`,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(CloseActiveModalCommand.create()),
});

export const PurchaseSuccessfulModal = connect(mapStateToProps, mapDispatchToProps)(PurchaseSuccessModal);
