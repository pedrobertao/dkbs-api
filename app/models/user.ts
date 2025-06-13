export interface IUser {
  id: string;
  name: string;
  email: string;
  permissions: Permissions[];
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "Admin" | "Editor" | "Viewer" | "Unknown";
export type Permissions = "Read" | "Update" | "Delete" | "Create";
