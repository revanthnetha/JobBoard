import { Request, Response } from "express";
import nodemailer from "nodemailer";
import twilio from "twilio";
import bcrypt from "bcrypt";
import CompanyModel from "../models/CompanyModel";
import { companyRegistrationSchema, CompanyRegistrationData } from "../../../common/types/company-info";
import crypto from "crypto";
import {z} from "zod"

// Configure Twilio
const twilioClient = twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);

// Configure Nodemailer
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

// Registration
export const registerCompany = async (req: Request, res: Response) => {
  try {
    const validatedData: CompanyRegistrationData = companyRegistrationSchema.parse(req.body);
    const { name, phoneNo, companyName, companyEmail, companySize, password } = validatedData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const emailOTP = generateOTP();
    const phoneOTP = generateOTP();

    const newCompany = new CompanyModel({
      name,
      phoneNo,
      companyName,
      companyEmail,
      companySize,
      password: hashedPassword,
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
      if (err) console.error("Error sending email:", err);
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
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Email Verification
export const verifyEmail = async (req: Request, res: Response) => {
  const { companyEmail, otp } = req.body;
  try {
    const company = await CompanyModel.findOne({ companyEmail, emailVerificationCode: otp });
    if (!company) {
      return res.status(400).json({ message: "Invalid OTP or email" });
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

// Phone Verification
export const verifyPhone = async (req: Request, res: Response) => {
  const { phoneNo, otp } = req.body;
  try {
    const company = await CompanyModel.findOne({ phoneNo, phoneVerificationCode: otp });
    if (!company) {
      return res.status(400).json({ message: "Invalid OTP or phone number" });
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
