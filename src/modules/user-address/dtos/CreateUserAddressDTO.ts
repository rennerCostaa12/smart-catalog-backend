export interface CreateUserAddressDTO {
  label: string;
  address: string;
  neighborhood: string;
  complement?: string | null;
  city: string;
  state: string;
  number: number;
  postalCode: string;
  userId: number;
}
