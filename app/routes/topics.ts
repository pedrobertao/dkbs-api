import { Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { checkParams } from "./validator";
import { controller } from "../controllers/user";

const topicsRoute = Router();

const getByIDValidation = param("id").notEmpty();
const getByID = topicsRoute.get(
  "/:id",
  getByIDValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = checkParams(req);
      if (error) {
        res.status(404).json({ errors: error.array() });
        return;
      }

      const response = await controller.getTopic(req.params.id);
      if (response) {
        res.status(200).json(response);
        return;
      }
      res.status(404).json({ message: "Topic not found" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);
// const getByIDValidation = param("id").notEmpty();
const getTreeByID = topicsRoute.get(
  "/:id/tree",
  getByIDValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = checkParams(req);
      if (error) {
        res.status(404).json({ errors: error.array() });
        return;
      }

      const response = await controller.getTopicTree(req.params.id);
      if (response) {
        res.status(200).json(response);
        return;
      }
      res.status(404).json({ message: "Topic not found" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

const createOrUpdatetValidation = [
  body("id").notEmpty(),
  body("name").notEmpty(),
  body("content").notEmpty(),
];
const createOrUpdate = topicsRoute.put(
  "/",
  ...createOrUpdatetValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = checkParams(req);
      if (error) {
        res.status(404).json({ errors: error.array() });
        return;
      }
      const response = await controller.createTopicOrUpdate(req);
      if (response) {
        res.status(200).json(response);
        return;
      }
      res.status(404).json({ message: "Topic not found" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

const deleteByIDValidation = param("id").notEmpty();
const deleteByID = topicsRoute.delete(
  "/:id",
  deleteByIDValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = checkParams(req);
      if (error) {
        res.status(400).json({ errors: error.array() });
        return;
      }
      const response = await controller.deleteResource(req.params.id);
      if (response) {
        res.status(200).json(response);
        return;
      }
      res.status(400).json({ message: "Topic not found" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

topicsRoute.use("/topics", getByID);
topicsRoute.use("/topics", createOrUpdate);
topicsRoute.use("/topics", deleteByID);
topicsRoute.use("/topics", getTreeByID);

export default topicsRoute;
