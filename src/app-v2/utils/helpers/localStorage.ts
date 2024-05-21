const stringify = (value: unknown): string => {
  return JSON.stringify(value);
};

const parse = (value: string | null) => {
  if (!value) {
    return '';
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    console.error(e);
  }
};

export const setStorageItem = (key: string, value: unknown) => {
  localStorage.setItem(key, stringify(value));
};
export const getStorageItem = (key: string) => parse(localStorage.getItem(key));
export const removeStorageItem = (key: string) => localStorage.removeItem(key);
export const clearStorage = () => localStorage.clear();
