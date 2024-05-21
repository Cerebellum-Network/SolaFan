import {CircularProgress, makeStyles} from '@material-ui/core';
import {BigNumberish} from 'ethers';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {UsersNftCardInterface} from '../../../../types/nft';
import {Condition, ConditionsList} from '../../Conditions';
import {SellNftModalBox} from '../SellNftModalBox';
import {NftForm} from './NftForm';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '400px',
    paddingBottom: '24px',
  },
  header: {
    paddingLeft: '0',
    paddingRight: '0',
    borderBottom: 'none',
    paddingBottom: '16px',
  },
  closeBtn: {
    top: '32px',
    right: '24px',
  },
  container: {
    padding: '0',
  },
}));

type Props = {
  nft?: UsersNftCardInterface;
  amount: number;
  onClose: () => void;
  sell: (price: BigNumberish, quantity: number) => void;
  price?: number;
};

export const UpdatedSellModal = memo(({nft, onClose, amount = 1, price, sell}: Props) => {
  const {t} = useTranslation();
  const styles = useStyles();

  const handleSell = (price: number, quantity: number) => {
    sell(price, quantity);
  };

  if (!nft) {
    return null;
  }

  return (
    <SellNftModalBox
      title={t('Set listing price to sell your collectible')}
      onClose={onClose}
      classes={{
        header: styles.header,
        root: styles.root,
        closeBtn: styles.closeBtn,
        container: styles.container,
      }}
    >
      <ConditionsList>
        <Condition condition={!nft}>
          <CircularProgress />
        </Condition>
        <Condition condition={!!nft}>
          <NftForm amount={amount} price={price!} nft={nft} onSell={handleSell} />
        </Condition>
      </ConditionsList>
    </SellNftModalBox>
  );
});
