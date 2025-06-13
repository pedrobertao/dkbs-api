import { IUser } from "../../models/user";
import { UserFactory } from "./factory";
import { isUserRole, getUsersFromFile } from "./utils";
import Errors from "./errors";

export const getUserByID = async (id: string): Promise<IUser | null> => {
  try {
    const usersArray = await getUsersFromFile();
    const user = usersArray.find((u) => u.id == id);
    if (user) return user;
    return null;
  } catch (error) {
    console.error(error);
    throw Errors.ErrInternal;
  }
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const usersArray = await getUsersFromFile();
    const user = usersArray.find((u) => u.email == email);
    if (user) return user;
    return null;
  } catch (error) {
    console.error(error);
    throw Errors.ErrInternal;
  }
};

export const createUser = async (
  name: string,
  email: string,
  role: string
): Promise<IUser> => {
  try {
    const userRole = isUserRole(role);
    if (await getUserByEmail(email)) {
      throw Errors.ErrUserAlreadyRegister;
    }
    return UserFactory.createUser(name, email, userRole);
  } catch (error) {
    if (error === Errors.ErrUserAlreadyRegister) {
      throw Errors.ErrUserAlreadyRegister;
    }
    console.error(error);
    throw Errors.ErrInternal;
  }
};

export const deleteUserByID = async (id: string) => {
  try {
    const user = await getUserByEmail(id);
    if (!user) {
      throw Errors.ErrUserNotFound;
    }
  } catch (error) {
    if (error === Errors.ErrUserNotFound) {
      throw Errors.ErrUserNotFound;
    }
    console.error(error);
    throw Errors.ErrInternal;
  }
};

export const updateUserByID = async (id: string) => {
  try {
    const user = await getUserByID(id);
  } catch (error) {
    if (error === Errors.ErrUserNotFound) {
      throw Errors.ErrUserNotFound;
    }
    console.error(error);
    throw Errors.ErrInternal;
  }
};
