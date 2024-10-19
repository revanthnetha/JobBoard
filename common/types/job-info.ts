import { z } from "zod";

export const jobSchema = z.object({
    title: z.string().min(3, "Job title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    experienceLevel: z.string(),
    candidates: z.array(z.string().email()),
    endDate: z.string(), 
  });

  export type jobRegistrationData = z.infer<typeof jobSchema>;
  