type ResponseType = 'text' | 'blob' | 'json';
type ResponseDataType<T extends ResponseType> = T extends 'text' ? string : T extends 'blob' ? Blob : unknown;

export type RequestOptions<T = ResponseType> = {
  base: string | undefined;
  headers?: Record<string, string>;
  type?: T;
};

const processResponse = async (response: Response, type: ResponseType = 'json') => {
  if (!response.ok) {
    const text = await response.text();

    throw new Error(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        body: text,
      }),
    );
  }

  switch (type) {
    case 'blob':
      return response.blob();
    case 'text':
      return response.text();
    default:
      return response.json();
  }
};

export const get = async <T extends ResponseType>(
  url: string,
  options: RequestOptions<T>,
): Promise<ResponseDataType<T>> => {
  const response = await fetch(`${options.base}${url}`, {
    headers: options.headers,
  });

  return processResponse(response, options.type);
};

const defaultHeaders = {'content-type': 'application/json'};

export const post = async <T extends ResponseType>(
  url: string,
  data: unknown = {},
  options: RequestOptions<T>,
): Promise<ResponseDataType<T>> => {
  const response = await fetch(`${options.base}${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {...defaultHeaders, ...options.headers},
  });

  return processResponse(response, options.type);
};

export const del = async (url: string, data: unknown = {}, options: Omit<RequestOptions, 'type'>): Promise<unknown> => {
  const response = await fetch(`${options.base}${url}`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {...defaultHeaders, ...options.headers},
  });

  return processResponse(response);
};

export const patch = async <T extends ResponseType>(
  url: string,
  data: unknown = {},
  options: RequestOptions<T>,
): Promise<ResponseDataType<T>> => {
  const response = await fetch(`${options.base}${url}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {...defaultHeaders, ...options.headers},
  });

  return processResponse(response, options.type);
};
