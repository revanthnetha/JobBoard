import { z } from "zod";

export const companyRegistrationSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phoneNo: z.number().min(10, "Phone number is invalid"),
  companyName: z.string().min(2, "Company name is too short"),
  companyEmail: z.string().email("Invalid email format"),
  companySize: z.number().min(1, "Company size must be at least 1"),
});

export type CompanyRegistrationData = z.infer<typeof companyRegistrationSchema>;
