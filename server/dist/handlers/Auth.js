"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPhone = exports.verifyEmail = exports.registerCompany = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const twilio_1 = __importDefault(require("twilio"));
const CompanyModel_1 = __importDefault(require("../models/CompanyModel"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const companyRegistrationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name is too short"),
    phoneNo: zod_1.z.string().min(10, "Phone number is invalid"),
    companyName: zod_1.z.string().min(2, "Company name is too short"),
    companyEmail: zod_1.z.string().email("Invalid email format"),
    companySize: zod_1.z.number().min(1, "Company size must be at least 1"),
});
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const twilioClient = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 986500);
};
const generateJWT = (companyId) => {
    return jsonwebtoken_1.default.sign({ companyId }, JWT_SECRET);
};
// Function to format phone number to E.164
const formatPhoneNumberToE164 = (phoneNo, countryCode) => {
    // Example: "+91" for India
    return countryCode + phoneNo;
};
const registerCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = companyRegistrationSchema.parse(req.body);
        const { name, phoneNo, companyName, companyEmail, companySize } = validatedData;
        const emailOTP = generateOTP();
        const phoneOTP = generateOTP();
        const formattedPhoneNo = formatPhoneNumberToE164(phoneNo, "+91");
        const newCompany = new CompanyModel_1.default({
            name,
            phoneNo: formattedPhoneNo,
            companyName,
            companyEmail,
            companySize,
            emailVerificationCode: emailOTP.toString(),
            phoneVerificationCode: phoneOTP.toString(),
        });
        yield newCompany.save();
        const emailOptions = {
            from: process.env.EMAIL_USER,
            to: companyEmail,
            subject: "Email Verification Code for JobBoard",
            text: `Your verification code is ${emailOTP}`,
        };
        transporter.sendMail(emailOptions, (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
                return;
            }
        });
        twilioClient.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications.create({
            to: formattedPhoneNo,
            channel: "sms",
        })
            .then((verification) => console.log("SMS sent:", verification.sid))
            .catch((error) => console.error("Error sending SMS:", error));
        res
            .status(201)
            .json({
            message: "Company registered. Verify your email and phone number.",
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ errors: error.errors });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerCompany = registerCompany;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyEmail, otp } = req.body;
    try {
        const company = yield CompanyModel_1.default.findOne({
            companyEmail,
            emailVerificationCode: otp,
        });
        if (!company) {
            res.status(400).json({ message: "Invalid OTP or email" });
            return;
        }
        company.isEmailVerified = true;
        company.emailVerificationCode = null;
        yield company.save();
        if (company.isPhoneVerified) {
            const token = generateJWT(company._id.toString());
            res.status(200).json({ message: "Email verified successfully!", token });
            return;
        }
        res
            .status(200)
            .json({
            message: "Email verified successfully! Please verify your phone number.",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error verifying email." });
    }
});
exports.verifyEmail = verifyEmail;
const verifyPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNo, otp } = req.body;
    try {
        const formattedPhoneNo = formatPhoneNumberToE164(phoneNo, "+91");
        const verificationCheck = yield twilioClient.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks.create({
            to: formattedPhoneNo,
            code: otp,
        });
        if (verificationCheck.status !== "approved") {
            res.status(400).json({ message: "Invalid OTP or phone number" });
            return;
        }
        const company = yield CompanyModel_1.default.findOne({ phoneNo: formattedPhoneNo });
        if (!company) {
            res.status(400).json({ message: "Company not found" });
            return;
        }
        company.isPhoneVerified = true;
        yield company.save();
        if (company.isEmailVerified) {
            const token = generateJWT(company._id.toString());
            res
                .status(200)
                .json({ message: "Phone number verified successfully!", token });
            return;
        }
        res
            .status(200)
            .json({
            message: "Phone number verified successfully! Please verify your email.",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error verifying phone number." });
    }
});
exports.verifyPhone = verifyPhone;
