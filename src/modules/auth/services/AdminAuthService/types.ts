type AdminResponse = {
  id: number;
  name: string;
  document: string;
  email: string;
  phone: string;
  catalogClientId: number;
};

export type AuthResponse = {
  admin: AdminResponse;
  token: string;
};