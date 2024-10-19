"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../handlers/Auth");
const Router = express_1.default.Router();
Router.post("/register", Auth_1.registerCompany);
Router.get("/verify-email", Auth_1.verifyEmail);
Router.get("/verify-phone", Auth_1.verifyPhone);
exports.default = Router;
