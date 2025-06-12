import { Router } from "express";
import path from "path";

const home = Router();

home.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../public", "home.html"));
});

export default home;
