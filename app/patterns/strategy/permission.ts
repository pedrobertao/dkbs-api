import { ITopic } from "../../entities/topic";
import { IUser } from "../../entities/user";
import { IPermission } from "../../entities/permission";

export interface IPermissionStrategy {
  canRead(user: IUser, topic: ITopic): boolean;
  canWrite(user: IUser, topic: ITopic): boolean;
  canDelete(user: IUser, topic: ITopic): boolean;
  canManageResources(user: IUser, topic: ITopic): boolean;
}

export class AdminPermissionStrategy implements IPermission {
  canRead(): boolean {
    return true;
  }
  canWrite(): boolean {
    return true;
  }
  canDelete(): boolean {
    return true;
  }
  canManageResources(): boolean {
    return true;
  }
}

export class EditorPermissionStrategy implements IPermission {
  canRead(): boolean {
    return true;
  }
  canWrite(): boolean {
    return true;
  }
  canDelete(): boolean {
    return false;
  }
  canManageResources(): boolean {
    return true;
  }
}

export class ViewerPermissionStrategy implements IPermission {
  canRead(): boolean {
    return true;
  }
  canWrite(): boolean {
    return false;
  }
  canDelete(): boolean {
    return false;
  }
  canManageResources(): boolean {
    return false;
  }
}

export class InvalidPermission implements IPermission {
  canRead(): boolean {
    return false;
  }
  canWrite(): boolean {
    return false;
  }
  canDelete(): boolean {
    return false;
  }
  canManageResources(): boolean {
    return false;
  }
}
