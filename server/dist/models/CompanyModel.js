"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const mongoose_1 = __importDefault(require("mongoose"));
const companySchema = new mongoose_1.default.Schema({
    id: { type: String, default: () => (0, uuid_1.v4)() },
    name: { type: String, required: true },
    phoneNo: { type: Number, required: true, unique: true },
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true, unique: true },
    companySize: { type: Number, required: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String },
    isPhoneVerified: { type: Boolean, default: false },
    phoneVerificationCode: { type: String },
}, { timestamps: true });
const CompanyModel = mongoose_1.default.model("company", companySchema);
exports.default = CompanyModel;
