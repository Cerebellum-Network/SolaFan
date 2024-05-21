import {errorCodes, errors} from '../../const/errors';

export const CUSTOM_ERROR = 'custom-error';

export const dispatchError = (error: string) => {
  window.dispatchEvent(new CustomEvent(CUSTOM_ERROR, {detail: error}));
};

const extractErrorFromHttpResponse = (error: any): string => {
  let result = '';
  try {
    const errorUnwrap = JSON.parse(error?.message);
    const bodyUnwrap = JSON.parse(errorUnwrap?.body);
    result = bodyUnwrap?.message || '';
  } catch (e) {}

  return result;
};

export const humanReadableError = (error: any, prefix = 'Details: ') => {
  const errorConverted =
    (error?.message && errors()[error.message as string]) ||
    (error?.data?.message && errors()[error.data.message as string]) ||
    (error?.code && errorCodes()[error.code as string]) ||
    (error?.data?.code && errorCodes()[error.data.code as string]) ||
    extractErrorFromHttpResponse(error) ||
    '';

  return errorConverted ? `${prefix}${errorConverted}` : '';
};
