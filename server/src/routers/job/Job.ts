import express from "express";
import { postJob } from "../../handlers/Job";
import { authenticateJWT } from "../../middlewares/auth";

const jobRouter = express.Router();

jobRouter.post("/post", authenticateJWT, postJob);

export default jobRouter;
