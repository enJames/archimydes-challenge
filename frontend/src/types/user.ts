export enum UserRole {
  Admin = "Admin",
  User = "User"
}

export interface CreateUserData {
  name: string;
  emailAddress: string;
  role: UserRole;
}

export interface User extends CreateUserData {
  id: string;
}

export interface UpdateUserData extends CreateUserData {
  id: string;
}