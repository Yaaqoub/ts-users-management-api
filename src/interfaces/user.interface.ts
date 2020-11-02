export interface User {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  address?: string;
  zipCode?: string;
  gender: string;
  avatar: string;
  archived: boolean;
}
