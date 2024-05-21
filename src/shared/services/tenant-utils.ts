import {TenantParams} from './tenant.service';

let cachedCurrentTenant: string;
let cachedTenantParams: TenantParams;

const URL_TO_TENANT_MAP = process.env.REACT_APP_URL_TO_TENANT_MAP;

export const detectTenant = (): string => {
  const originToTenant = JSON.parse(URL_TO_TENANT_MAP!);
  const origin = window.location.origin;

  const tenant = originToTenant[origin] || '';

  if (!tenant) {
    throw new Error(`There is no tenant configured for origin: ${origin}`);
  }

  cachedCurrentTenant = tenant;

  return tenant;
};

export const getTenantId = (): string => {
  if (!cachedCurrentTenant && process.env.NODE_ENV !== 'test') {
    throw new Error('Tenant ID is empty!');
  }

  return cachedCurrentTenant;
};

export const saveTenantParams = (params: TenantParams) => {
  cachedTenantParams = params;
};

export const getTenantParams = (): TenantParams => {
  if (!cachedCurrentTenant && process.env.NODE_ENV !== 'test') {
    throw new Error('Tenant params are empty!');
  }

  return process.env.NODE_ENV === 'test' ? cachedTenantParams || {} : cachedTenantParams;
};
