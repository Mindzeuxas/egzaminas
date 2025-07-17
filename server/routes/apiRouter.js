import express from "express";
import { publicApiRouter } from "./publicApiRouter.js";
import { adminApiRouter } from "./adminApiRouter.js";

export const apiRouter = express.Router();

apiRouter.use("/public", publicApiRouter);
apiRouter.use("/admin", adminApiRouter);

apiRouter.all("*error", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No such API route exists",
  });
});
