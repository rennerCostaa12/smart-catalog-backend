type AdminResponse = {
  id: number;
  name: string;
  document: string;
  email: string;
  phone: string;
  catalogClientSlug: string | undefined;
};

export type AuthResponse = {
  admin: AdminResponse;
  token: string;
};
