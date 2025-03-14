export interface User {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date | string;
  email: string;
  avatar: string;
  hasContract: boolean;
}
