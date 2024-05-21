import crypto from 'crypto';

export const getRandomSha256Helper = (): string => {
  const randomCode = `${(Math.random() + 1).toString(36)}`;
  return crypto.createHash('sha256').update(randomCode).digest('hex');
};
