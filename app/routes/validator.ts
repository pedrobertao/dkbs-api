import { Request } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const checkParams = (req: Request): Result<ValidationError> | null => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return null;
  }
  return errors;
};
