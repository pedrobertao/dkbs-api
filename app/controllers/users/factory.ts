import { IUser, Permissions, UserRole } from "../../models/user";
import { v4 as uuidv4 } from "uuid";

export class UserFactory {
  static createUser(name: string, email: string, role: UserRole): IUser {
    switch (role) {
      case "Admin":
        return new Admin(name, email);
      case "Editor":
        return new Editor(name, email);
      case "Viewer":
        return new Viewer(name, name);
      default:
        throw new Error(`role invalid: ${role}`);
    }
  }
}

class UserObj implements IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: Permissions[] = [];
  role: UserRole = "Unknown";

  constructor(name: string, email: string) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

class Admin extends UserObj {
  constructor(name: string, email: string) {
    super(name, email);
    this.role = "Admin";
    this.permissions = ["Create", "Delete", "Read", "Update"];
  }
}

class Editor extends UserObj {
  constructor(name: string, email: string) {
    super(name, email);
    this.role = "Editor";
    this.permissions = ["Read", "Update"];
  }
}

class Viewer extends UserObj {
  constructor(name: string, email: string) {
    super(name, email);
    this.role = "Viewer";
    this.permissions = ["Read"];
  }
}
