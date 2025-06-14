import { ITopic } from "./topic";
import { IUser } from "./user";

export interface IPermission {
  canRead(user: IUser, topic: ITopic): boolean;
  canWrite(user: IUser, topic: ITopic): boolean;
  canDelete(user: IUser, topic: ITopic): boolean;
  canManageResources(user: IUser, topic: ITopic): boolean;
}
