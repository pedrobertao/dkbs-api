import { Router } from "express";

import health from "./health";
import userRoute from "./users";

const app = Router();
app.use(health);
app.use(userRoute);

export default app;
