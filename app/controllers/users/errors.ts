const ErrUserNotFound = new Error("user not found");
const ErrInternal = new Error("error searching user");
const ErrInvalidUserRole = new Error("invalid user role");
const ErrUserAlreadyRegister = new Error("user already registered");

export default {
  ErrUserNotFound,
  ErrInternal,
  ErrInvalidUserRole,
  ErrUserAlreadyRegister,
};
