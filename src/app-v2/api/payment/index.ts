import axios from 'axios';

import {PAYMENT_SERVICE_API_URL, tenantId} from '../../../config/common';
import {PaymentRESTApi} from './PaymentRESTApi';

const api = axios.create({
  baseURL: PAYMENT_SERVICE_API_URL,
  headers: {
    'X-Tenant-Id': tenantId(),
  },
});

export const paymentApi = new PaymentRESTApi(api);
