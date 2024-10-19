import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Router from "./routers/company-auth/Auth";
import jobRouter from "./routers/job/Job";
import { configDotenv } from "dotenv";
import connectDB from "./db";

const app = express();
configDotenv();

const port = process.env.PORT || 5000;

app.use(express.json());
connectDB();
app.use(cors());
app.use(bodyParser.json());


app.use("/api/company", Router);
app.use("/api/job", jobRouter);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
