import { ITopic } from "../../entities/topic";
import { IUser, UserRole } from "../../entities/user";
import { IPermissionStrategy } from "../strategy/permission";
import {
  AdminPermissionStrategy,
  EditorPermissionStrategy,
  ViewerPermissionStrategy,
} from "../strategy/permission";

export class PermissionContext {
  private strategy: IPermissionStrategy | undefined;

  constructor(user: IUser) {
    this.setStrategy(user.role);
  }

  setStrategy(role: UserRole): void {
    switch (role) {
      case UserRole.ADMIN:
        this.strategy = new AdminPermissionStrategy();
        break;
      case UserRole.EDITOR:
        this.strategy = new EditorPermissionStrategy();
        break;
      case UserRole.VIEWER:
        this.strategy = new ViewerPermissionStrategy();
        break;
      default:
        throw new Error(`strategy not found for role ${role}`);
    }
  }

  canRead(user: IUser, topic: ITopic): boolean {
    return this.strategy!.canRead(user, topic);
  }

  canWrite(user: IUser, topic: ITopic): boolean {
    return this.strategy!.canWrite(user, topic);
  }

  canDelete(user: IUser, topic: ITopic): boolean {
    return this.strategy!.canDelete(user, topic);
  }

  canManageResources(user: IUser, topic: ITopic): boolean {
    return this.strategy!.canManageResources(user, topic);
  }
}
