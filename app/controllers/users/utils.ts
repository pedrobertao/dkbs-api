import path from "path";
import fs from "fs/promises";
import { IUser, UserRole } from "../../models/user";
import Errors from "./errors";

export const isUserRole = (value: string): UserRole => {
  if (["Admin", "Editor", "Viewer"].includes(value as UserRole)) {
    return value as UserRole;
  }
  throw Errors.ErrInvalidUserRole;
};

export const getUsersFromFile = async (): Promise<IUser[]> => {
  const usersDB = await fs.readFile(
    path.join(__dirname, "usersDB.json"),
    "utf-8"
  );
  return JSON.parse(usersDB) as IUser[];
};
