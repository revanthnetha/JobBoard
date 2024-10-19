import express from "express"
import { registerCompany, verifyEmail, verifyPhone } from "../../handlers/Auth";
const Router = express.Router();

Router.post("/register",registerCompany);

Router.get("/verify-email",verifyEmail)

Router.get("/verify-phone",verifyPhone)


export default Router
