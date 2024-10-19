import express,{Request,Response} from "express";
import nodemailer from "nodemailer";
import twilio from "twilio";
import CompanyModel from "../models/CompanyModel";
import {z} from "zod"

 const companyRegistrationSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phoneNo: z.number().min(10, "Phone number is invalid"),
  companyName: z.string().min(2, "Company name is too short"),
  companyEmail: z.string().email("Invalid email format"),
  companySize: z.number().min(1, "Company size must be at least 1"),
});

type CompanyRegistrationData = z.infer<typeof companyRegistrationSchema>;

const twilioClient = twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 986500);
};

export const registerCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData: CompanyRegistrationData = companyRegistrationSchema.parse(req.body);
    const { name, phoneNo, companyName, companyEmail, companySize} = validatedData;

    const emailOTP = generateOTP();
    const phoneOTP = generateOTP();

    const newCompany = new CompanyModel({
      name,
      phoneNo,
      companyName,
      companyEmail,
      companySize,
      emailVerificationCode: emailOTP.toString(),
      phoneVerificationCode: phoneOTP.toString(),
    });

    await newCompany.save();

    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: companyEmail,
      subject: "Email Verification Code for JobBoard",
      text: `Your verification code is ${emailOTP}`,
    };

    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err)
        return;
      };
    });

    twilioClient.messages
      .create({
        body: `Your verification code is ${phoneOTP}`,
        to: String(phoneNo),
        from: process.env.MOBILE_TWILIO,
      })
      .then((message) => console.log("SMS sent:", message.sid))
      .catch((error) => console.error("Error sending SMS:", error));

    res.status(201).json({ message: "Company registered. Verify your email and phone number." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const { companyEmail, otp } = req.body;
  try {
    const company = await CompanyModel.findOne({ companyEmail, emailVerificationCode: otp });
    if (!company) {
     res.status(400).json({ message: "Invalid OTP or email" });
     return;
    }

    company.isEmailVerified = true;
    company.emailVerificationCode = null;
    await company.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying email." });
  }
};

export const verifyPhone = async (req: Request, res: Response):Promise<void> => {
  const { phoneNo, otp } = req.body;
  try {
    const company = await CompanyModel.findOne({ phoneNo, phoneVerificationCode: otp });
    if (!company) {
     res.status(400).json({ message: "Invalid OTP or phone number" });
     return;
    }

    company.isPhoneVerified = true;
    company.phoneVerificationCode = null; 
    await company.save();

    res.status(200).json({ message: "Phone number verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying phone number." });
  }
};
