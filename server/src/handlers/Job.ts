import { Request, Response } from "express";
import JobModel from "../models/JobModel";
import { z } from "zod";
import CompanyModel from "../models/CompanyModel";
import nodemailer from "nodemailer";

const jobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  experienceLevel: z.string(),
  candidates: z.array(z.string().email()),
  endDate: z.string(),
});

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const postJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const companyId = req["userId"].companyId;
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      res.status(404).json({ message: "Company not found" });
      return;
    }

    const validatedJob = jobSchema.parse(req.body);
    const { title, description, experienceLevel, candidates, endDate } =
      validatedJob;

    const newJob = new JobModel({
      title,
      description,
      experienceLevel,
      candidates,
      endDate: new Date(endDate),
      postedBy: companyId,
    });

    await newJob.save();

    const emailSubject = `New Job Posted: ${title}`;
    const emailBody = `
      <h1>${title}</h1>
      <p><strong>Company:</strong> ${company.companyName}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Experience Level:</strong> ${experienceLevel}</p>
      <p><strong>Application Deadline:</strong> ${endDate}</p>
      <p>For more details, visit our job portal.</p>
    `;

    const emailPromises = candidates.map(async (candidateEmail) => {
      const emailOptions = {
        from: process.env.EMAIL_USER,
        to: candidateEmail,
        subject: emailSubject,
        html: emailBody,
      };

      return transporter.sendMail(emailOptions);
    });

    await Promise.all(emailPromises);

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
