"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Job_1 = require("../../handlers/Job");
const jobRouter = express_1.default.Router();
// authenticateJWT
jobRouter.post("/post", Job_1.postJob);
exports.default = jobRouter;
