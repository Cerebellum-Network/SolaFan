import {combineReducers} from 'redux';
import {Action, createAction, handleActions} from 'redux-actions';

import {AUTH} from './constants';

type SocialData = {
  type: string;
  token: string | null;
  email: string;
};

export const setSocialData = createAction(`${AUTH} set social data`, (data: SocialData) => data);
export const resetSocialData = createAction(`${AUTH} reset social data`);

const type = handleActions(
  {
    [setSocialData.toString()](_: string, {payload}: Action<SocialData>) {
      return payload.type;
    },
    [resetSocialData.toString()]() {
      return '';
    },
  },
  '',
);

const token = handleActions(
  {
    [setSocialData.toString()](_: string | null, {payload}: Action<SocialData>) {
      return payload.token;
    },
    [resetSocialData.toString()]() {
      return null;
    },
  },
  null,
);

const email = handleActions(
  {
    [setSocialData.toString()](_: string, {payload}: Action<SocialData>) {
      return payload.email;
    },
    [resetSocialData.toString()]() {
      return '';
    },
  },
  '',
);

export const socialDataReducer = combineReducers({
  type,
  email,
  token,
});
