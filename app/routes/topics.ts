import { Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { checkParams } from "./validator";
import { controller } from "../controllers/user";

const topicsRoute = Router();

const paramIDValidation = param("id").notEmpty();
const getByID = topicsRoute.get(
  "/:id",
  paramIDValidation,
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

const getTreeByID = topicsRoute.get(
  "/:id/tree",
  paramIDValidation,
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

const paramPathValidation = [param("id").notEmpty(), param("id").notEmpty()];
const getSortestPath = topicsRoute.get(
  "/:startId/:targetId",
  ...paramPathValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = checkParams(req);
      if (error) {
        res.status(404).json({ errors: error.array() });
        return;
      }

      const response = await controller.findPath(
        req.params.startId,
        req.params.targetId
      );
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
  body("parentTopicId").optional(),
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

const createResourceValidation = [
  body("id").notEmpty(),
  body("topicId").notEmpty(),
  body("url").notEmpty().isURL(),
  body("description").notEmpty(),
  body("type").notEmpty(),
];
const createResource = topicsRoute.put(
  "/:id/resource",
  ...createResourceValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = checkParams(req);
      if (error) {
        res.status(404).json({ errors: error.array() });
        return;
      }
      const response = await controller.createResource(req);
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

const deleteResourceByID = topicsRoute.delete(
  "/:id/resource",
  paramIDValidation,
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

topicsRoute.use("/topics", deleteResourceByID);
topicsRoute.use("/topics", createResource);
topicsRoute.use("/topics", getByID);
topicsRoute.use("/topics", createOrUpdate);
topicsRoute.use("/topics", getTreeByID);
topicsRoute.use("/topics", getSortestPath);

export default topicsRoute;
