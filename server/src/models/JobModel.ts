import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    id: { type: String, default: () => uuidv4() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    candidates: [{ type: String }],
    endDate: { type: Date, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("job", jobSchema);

export default JobModel;
