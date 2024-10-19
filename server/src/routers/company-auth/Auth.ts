import express from "express"
import { registerCompany, verifyEmail, verifyPhone } from "../../handlers/Auth";
const Router = express.Router();

Router.post("/register",registerCompany);

Router.post("/verify-email",verifyEmail)

Router.post("/verify-phone",verifyPhone)


export default Router
