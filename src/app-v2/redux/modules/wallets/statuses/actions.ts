import {createAction} from 'redux-actions';

export const setCereWalletReadiness = createAction('setCereWalletReadiness', (status: boolean) => status);
