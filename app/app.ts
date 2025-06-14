import express from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";
import path from "path";
import { customLogger } from "./middleware/logger";

// Express App
const app = express();

// Essentials
app.use(express.json());
app.use(customLogger);

// Routing
app.use("/v1", routes);
// Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Welcome Page
app.use("/", (_, res) => {
  res.sendFile(path.join(__dirname, "/public", "home.html"));
});

// Everything Else
app.use((_, res) =>
  res.sendFile(path.join(__dirname, "/public", "notfound.html"))
);

export default app;
