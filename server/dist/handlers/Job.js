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
exports.postJob = void 0;
const JobModel_1 = __importDefault(require("../models/JobModel"));
const zod_1 = require("zod");
const CompanyModel_1 = __importDefault(require("../models/CompanyModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jobSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Job title must be at least 3 characters long"),
    description: zod_1.z
        .string()
        .min(10, "Description must be at least 10 characters long"),
    experienceLevel: zod_1.z.string(),
    candidates: zod_1.z.array(zod_1.z.string().email()),
    endDate: zod_1.z.string(),
});
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const postJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // req["userId"].companyId
        const companyId = "6713964a723be08fef1fff31";
        const company = yield CompanyModel_1.default.findById(companyId);
        if (!company) {
            res.status(404).json({ message: "Company not found" });
            return;
        }
        const validatedJob = jobSchema.parse(req.body);
        const { title, description, experienceLevel, candidates, endDate } = validatedJob;
        const newJob = new JobModel_1.default({
            title,
            description,
            experienceLevel,
            candidates,
            endDate: new Date(endDate),
            postedBy: companyId,
        });
        yield newJob.save();
        const emailSubject = `New Job Posted: ${title}`;
        const emailBody = `
      <h1>${title}</h1>
      <p><strong>Company:</strong> ${company.companyName}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Experience Level:</strong> ${experienceLevel}</p>
      <p><strong>Application Deadline:</strong> ${endDate}</p>
      <p>For more details, visit our job portal.</p>
    `;
        const emailPromises = candidates.map((candidateEmail) => __awaiter(void 0, void 0, void 0, function* () {
            const emailOptions = {
                from: process.env.EMAIL_USER,
                to: candidateEmail,
                subject: emailSubject,
                html: emailBody,
            };
            return transporter.sendMail(emailOptions);
        }));
        yield Promise.all(emailPromises);
        res.status(201).json({ message: "Job posted successfully", job: newJob });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ errors: error.errors });
            return;
        }
        console.error("Error posting job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.postJob = postJob;
