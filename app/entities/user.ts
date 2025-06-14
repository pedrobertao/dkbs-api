export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
}

export interface IUser {
  id: string;
  role: UserRole;
}
