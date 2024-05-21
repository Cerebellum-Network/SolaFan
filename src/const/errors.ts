import i18n from '../i18n';

export const errors: () => Record<string, string> = () => ({
  'intrinsic gas too low': i18n.t('No MATIC to pay for the transaction'),
  'insufficient funds for gas * price + value': i18n.t('No MATIC to pay for the transaction'),
  'execution reverted: Not for sale': i18n.t('This NFT cannot be sold!'),
  'replacement transaction underpriced': i18n.t('Transaction price changed. Please repeat purchase!'),
  'Check your wallet config and try again': i18n.t('Check your wallet config and try again'),
});

export const errorCodes: () => Record<string | number, string> = () => ({
  INSUFFICIENT_FUNDS: i18n.t('No MATIC to pay for the transaction'),
  417: i18n.t('Error while gas estimation'),
  4001: i18n.t('Torus Tx Signature: User denied transaction signature.'),
});
