const toUnknownArray = (maybeArray: unknown): unknown[] => {
  if (Array.isArray(maybeArray)) {
    return maybeArray;
  }
  return [];
};

export {toUnknownArray};
