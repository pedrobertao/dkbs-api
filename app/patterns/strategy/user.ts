import { IPermission } from "../../entities/permission";

class AdminPermissionStrategy implements IPermission {
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

class EditorPermissionStrategy implements IPermission {
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

class ViewerPermissionStrategy implements IPermission {
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
