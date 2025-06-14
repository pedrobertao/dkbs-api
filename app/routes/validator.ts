import { Request } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { body, param } from "express-validator";

export const paramIDValidation = param("id").notEmpty();
export const paramPathValidation = [
  param("startId").notEmpty(),
  param("targetId").notEmpty(),
];
export const createOrUpdatetValidation = [
  body("id").notEmpty(),
  body("name").notEmpty(),
  body("content").notEmpty(),
  body("parentTopicId").optional(),
];
export const createResourceValidation = [
  body("id").notEmpty(),
  body("topicId").notEmpty(),
  body("url").notEmpty().isURL(),
  body("description").notEmpty(),
  body("type").notEmpty(),
];

export const checkParams = (req: Request): Result<ValidationError> | null => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return null;
  }
  return errors;
};
