import {Chip, makeStyles, Theme} from '@material-ui/core';
import {useLocalization} from 'app-v2/hooks/use-locale.hook';
import clsx from 'clsx';
import {useCallback, useMemo} from 'react';
import {Field, Form, FormSpy} from 'react-final-form';

import {NonCustodyWalletTitles} from '../../../../../shared/types/non-custody-wallet';
import {ALL_WALLET, AllWallets, AppWallet, SupportedWallet} from '../../../../../shared/types/supported-wallet';
import {NonCustodyWallets} from '../../../../models/wallet/types';

const useStyles = makeStyles((theme: Theme) => ({
  selector: {
    marginRight: 4,
  },
  active: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));

interface WalletSelectorProps {
  nonCustodyWallets: NonCustodyWallets[];
  appTitle: string;
  setActiveWallet: (activeWallet: AllWallets) => unknown;
}

type FormValues = {
  wallet: AllWallets;
};

export const WalletSelector = ({nonCustodyWallets, appTitle, setActiveWallet}: WalletSelectorProps) => {
  const styles = useStyles();
  const {t} = useLocalization();
  const initialValue = useMemo(() => ({wallet: ALL_WALLET}), []);

  const titles: Record<SupportedWallet, string> = useMemo(
    () => ({
      ...{[AppWallet.DAVINCI]: appTitle},
      ...NonCustodyWalletTitles,
    }),
    [appTitle],
  );

  const walletOptions: {value: SupportedWallet | typeof ALL_WALLET; label: string | SupportedWallet}[] = useMemo(
    () => [
      {value: ALL_WALLET, label: t('All')},
      ...nonCustodyWallets.map(({type}) => ({label: t('{{title}} wallet', {title: titles[type]}), value: type})),
    ],
    [nonCustodyWallets, titles, t],
  );

  const submit = useCallback(
    ({wallet}: FormValues) => {
      setActiveWallet(wallet);
    },
    [setActiveWallet],
  );
  const onChange = useCallback(
    ({values}: {dirty: boolean; values: FormValues}) => {
      submit(values);
    },
    [submit],
  );

  return (
    <Form initialValues={initialValue} onSubmit={submit}>
      {({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <FormSpy subscription={{dirty: true, values: true}} onChange={onChange} />
          <Field name="wallet">
            {({input}) => (
              <>
                {walletOptions.map(({value, label}) => (
                  <Chip
                    key={value}
                    className={clsx(styles.selector, value === input.value && styles.active)}
                    label={label}
                    onClick={value === input.value ? undefined : () => input.onChange(value)}
                    size="small"
                  />
                ))}
              </>
            )}
          </Field>
        </form>
      )}
    </Form>
  );
};
