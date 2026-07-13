type AdminResponse = {
  id: number;
  name: string;
  document: string;
  email: string;
  phone: string;
  catalogClient: {
    id?: number;
    slug?: string;
  };
};

export type AuthResponse = {
  admin: AdminResponse;
  token: string;
};
