import { Router } from "express";

const hidden = Router();

hidden.get("/protected", function (_, res) {
  res.status(200).send({
    message: "this is a protected route!",
  });
});

export default hidden;
