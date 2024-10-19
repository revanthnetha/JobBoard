import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    id: { type: String, default: () => uuidv4() },
    name: { type: String, required: true },
    phoneNo: { type: Number, required: true, unique: true },
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true, unique: true },
    companySize: { type: Number, required: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String },
    isPhoneVerified: { type: Boolean, default: false },
    phoneVerificationCode: { type: String },
  },
  { timestamps: true }
);

const CompanyModel = mongoose.model("company", companySchema);

export default CompanyModel;
