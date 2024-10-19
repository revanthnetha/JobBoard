"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Job_1 = require("../../handlers/Job");
const auth_1 = require("../../middlewares/auth");
const jobRouter = express_1.default.Router();
jobRouter.post("/post", auth_1.authenticateJWT, Job_1.postJob);
exports.default = jobRouter;
