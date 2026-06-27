export const getBearerToken = (authorization?: string): string | undefined => {
  return authorization?.match(/^Bearer ([^\s]+)$/i)?.[1];
};
