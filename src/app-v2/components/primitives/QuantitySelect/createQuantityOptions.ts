export const createQuantityOptions = (balance?: number): string[] =>
  balance
    ? Array(balance)
        .fill('')
        .map((_, i) => `${++i}`)
    : ['1'];
