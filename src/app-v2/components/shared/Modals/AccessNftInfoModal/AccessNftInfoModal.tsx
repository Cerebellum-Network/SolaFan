import {Button, Typography} from '@cere/rxb-template-ui-kit';
import {Box} from '@material-ui/core';
import {FC} from 'react';

import {ReactComponent as CheckIcon} from '../../../../assets/svg/check.svg';
import {useLocalization} from '../../../../hooks/use-locale.hook';

export interface AccessNftInfoModalProps {
  handleButtonClick: Function;
  accessTokenType?: boolean;
  appTitle: string;
}

export const AccessNftInfoModal: FC<AccessNftInfoModalProps> = ({
  handleButtonClick,
  accessTokenType = true,
  appTitle,
}) => {
  const {t} = useLocalization();

  const textModal = {
    accessInfo: [
      t(
        'Your NFT ticket is a collectible that increases value over time and can be resold on our Secondary Marketplace (Coming soon!)',
      ),
      t(`{{appTitle}} NFT tickets are more than just a collectible which you can view and own as NFT holder`, {
        appTitle: appTitle,
      }),
      t('These NFTs serve as ticket to unlock exclusive content and access the NFT exhibit experience once it starts'),
      t('During the live exhibit you can view, buy, and auction for exclusive NFTs'),
    ],
    exclusiveInfo: [
      t('Unique collectibles which can only be purchased as NFT ticket holder'),
      t('Place your bid on auction NFTs to own the one-and-only copy of the creator’s original asset'),
      t('Purchase limited edition NFTs of high resolution assets from the creator'),
    ],
  };

  return (
    <Box display="flex" flexDirection="column">
      {accessTokenType && (
        <Box m="0 0 6px 0" display="flex">
          <Box mr="12px">
            <CheckIcon />
          </Box>
          <Typography variant="body2">{textModal.accessInfo[0]}</Typography>
        </Box>
      )}
      <Box m="0 0 6px 0" display="flex">
        <Box mr="12px">
          <CheckIcon />
        </Box>
        <Typography variant="body2">
          {accessTokenType ? textModal.accessInfo[1] : textModal.exclusiveInfo[0]}
        </Typography>
      </Box>
      <Box m="6px 0" display="flex">
        <Box mr="12px">
          <CheckIcon />
        </Box>
        <Typography variant="body2">
          {accessTokenType ? textModal.accessInfo[2] : textModal.exclusiveInfo[1]}
        </Typography>
      </Box>
      <Box m="6px 0" display="flex">
        <Box mr="12px">
          <CheckIcon />
        </Box>
        <Typography variant="body2">
          {accessTokenType ? textModal.accessInfo[3] : textModal.exclusiveInfo[2]}
        </Typography>
      </Box>
      <Box m="18px auto 0" width="100%" maxWidth="140px">
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handleButtonClick}>
          {t('Got it')}
        </Button>
      </Box>
    </Box>
  );
};
