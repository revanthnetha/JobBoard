"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const mongoose_1 = __importDefault(require("mongoose"));
const jobSchema = new mongoose_1.default.Schema({
    id: { type: String, default: () => (0, uuid_1.v4)() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    candidates: [{ type: String }],
    endDate: { type: Date, required: true },
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "company",
        required: true,
    },
}, { timestamps: true });
const JobModel = mongoose_1.default.model("job", jobSchema);
exports.default = JobModel;
