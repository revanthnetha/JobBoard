import express from "express"
import cors from "cors"
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/company",require("./routers/company-auth/Auth"))

app.use("/api/job",require("./routers/job/Job"))
