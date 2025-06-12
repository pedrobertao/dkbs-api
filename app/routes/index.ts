import { Router } from "express";

import health from "./health";
import hidden from "./hidden";

const app = Router();
app.use(health);
app.use(hidden);

export default app;
