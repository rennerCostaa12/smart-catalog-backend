export type AuthMeResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
  catalogClient?: {
    id?: number;
    slug?: string;
  };
};
