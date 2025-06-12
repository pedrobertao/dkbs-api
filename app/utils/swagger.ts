import swaggerJsdoc from "swagger-jsdoc";
import { APP_NAME } from "../services/env";

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: APP_NAME,
      version: "1.0.0",
      description: "API documentation",
    },
  },
  apis: ["./app/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
