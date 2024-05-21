import {History} from 'history';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {HistoryObjectDocument} from '../../../redux/modules/navigation/actions';

type HistoryProviderProps = {
  saveHistoryObject: (history: History) => void;
};

const PlainHistoryProvider = ({saveHistoryObject}: HistoryProviderProps) => {
  const history: History = useHistory();
  useEffect(() => {
    saveHistoryObject(history);
  }, [history, saveHistoryObject]);
  return null;
};

export const HistoryProvider = connect(
  () => ({}),
  (dispatch) => ({saveHistoryObject: (history: History) => dispatch(HistoryObjectDocument.create(history))}),
)(PlainHistoryProvider);
