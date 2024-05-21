import {ReactElement} from 'react';

import {conditionId, conditionKey} from './constants';
import {ConditionProps} from './types';

export function Condition({condition, children}: ConditionProps): ReactElement {
  return condition ? <>{children}</> : <></>;
}

Condition[conditionKey] = conditionId;
