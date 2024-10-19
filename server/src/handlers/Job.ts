import { Request, Response } from "express";
import JobModel from "../models/JobModel";
import { z } from "zod";
import CompanyModel from "../models/CompanyModel";

const jobSchema = z.object({
    title: z.string().min(5, "Job title must be at least 5 characters long"),
    description: z.string().min(20, "Description must be at least 20 characters long"),
    experienceLevel: z.string().min(3, "Experience Level is required"),
    candidates: z.array(z.string().email()),
    endDate: z.string(), 
  });

  export const postJob = async (req: Request, res: Response) => {
    try {
      const companyId = req.user.companyId;  // Assuming JWT contains the company ID
      const company = await CompanyModel.findById(companyId);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
  
      const validatedJob = jobSchema.parse(req.body);
      const { title, description, experienceLevel, candidates, endDate } = validatedJob;
  
      const newJob = new JobModel({
        title,
        description,
        experienceLevel,
        candidates,
        endDate: new Date(endDate),
        postedBy: companyId, // reference to the company posting the job
      });
  
      await newJob.save();
      res.status(201).json({ message: "Job posted successfully", job: newJob });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error posting job:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };