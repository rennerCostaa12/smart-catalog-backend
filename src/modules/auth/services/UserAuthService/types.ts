type UserResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export type AuthResponse = {
  user: UserResponse;
  token: string;
};