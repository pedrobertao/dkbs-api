import { Request, Response, Router } from "express";
import { controller } from "../controllers/user";
import * as Validator from "./validator";

const topicsRoute = Router();

const getByID = topicsRoute.get(
  "/:id",
  Validator.paramIDValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = Validator.checkParams(req);
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
  Validator.paramIDValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = Validator.checkParams(req);
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

const getSortestPath = topicsRoute.get(
  "/:startId/:targetId",
  ...Validator.paramPathValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = Validator.checkParams(req);
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
      res.status(404).json({ message: "Start or target not found" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

const createOrUpdate = topicsRoute.put(
  "/",
  ...Validator.createOrUpdatetValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = Validator.checkParams(req);
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

const createResource = topicsRoute.put(
  "/:id/resource",
  ...Validator.createResourceValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = Validator.checkParams(req);
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
  Validator.paramIDValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const error = Validator.checkParams(req);
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
