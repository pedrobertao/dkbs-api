import { Router } from "express";

import health from "./health";
import topics from "./topics";

const app = Router();
app.use(health);
app.use(topics);

export default app;
