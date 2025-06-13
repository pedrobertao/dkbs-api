import { Request, Response, Router } from "express";
import { body, query } from "express-validator";
import * as UserControllers from "../controllers/users";
import { checkParams } from "./validator";

const userRoute = Router();

// Get User
const getValidation = query("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Invalid email");
const get = userRoute.get(
  "/",
  getValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = checkParams(req);
      if (error) {
        res.status(400).json({ errors: error.array() });
        return;
      }
      const { email } = req.body;
      const user = await UserControllers.getUserByEmail(email);
      if (user) {
        res.status(200).json(user);
        return;
      }
      res.status(404).json({ message: "User not found" });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
      return;
    }
  }
);

// Create User
const putValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
];
const put = userRoute.put(
  "/",
  ...putValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = checkParams(req);
      if (error) {
        res.status(400).json({ errors: error.array() });
        return;
      }

      const { name, email, role } = req.body;
      const user = await UserControllers.createUser(name, email, role);
      res.status(200).json({ message: "User created" + user.name });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
      return;
    }
  }
);

// Delete User
const deleteValidation = [body("id").notEmpty().withMessage("ID is required")];
const del = userRoute.delete(
  "/",
  ...deleteValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = checkParams(req);
      if (error) {
        res.status(400).json({ errors: error.array() });
        return;
      }

      const { id } = req.body;
      await UserControllers.deleteUserByID(id);
      res.status(200).json({ message: "User deleted" });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
      return;
    }
  }
);

// Update User
const updateValidation = [body("id").notEmpty().withMessage("ID is required")];
const pat = userRoute.patch(
  "/",
  ...updateValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = checkParams(req);
      if (error) {
        res.status(400).json({ errors: error.array() });
        return;
      }

      const { id } = req.body;
      await UserControllers.updateUserByID(id);
      res.status(200).json({ message: "User updated" });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
      return;
    }
  }
);

userRoute.use("/user", put);
userRoute.use("/user", get);
userRoute.use("/user", del);
userRoute.use("/user", pat);

export default userRoute;
