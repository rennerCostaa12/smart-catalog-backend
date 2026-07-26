export const getBearerToken = (authorization?: string): string | undefined => {
  return authorization?.match(/^([^\s]+)$/i)?.[1];
};
