import express from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";
import home from "./routes/home";
import path from "path";

// Express App
const app = express();

// Essentials
app.use(express.json());

// Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Welcome Page
app.use("/", home);

// Routing
app.use("/v1", routes);

// Everything Else
app.use((_, res) =>
  res.sendFile(path.join(__dirname, "/public", "notfound.html"))
);

export default app;
