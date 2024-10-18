import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import Router from "./routers/company-auth/Auth";
import { configDotenv } from "dotenv";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/company",Router)

app.use("/api/job",require("./routers/job/Job"))


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  