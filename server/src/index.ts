import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Router from "./routers/company-auth/Auth";
import jobRouter from "./routers/job/Job";
import connectDB from "./db";
import dotenv from 'dotenv';
dotenv.config();


const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
connectDB();
app.use(cors({
  origin: 'https://jobboard-cuvette.netlify.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  
}));

app.options('*', cors());
app.use(bodyParser.json());

app.get("/",async (req,res)=>{
  res.send("Hello from server");
})
app.use("/api/company", Router);
app.use("/api/job", jobRouter);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
