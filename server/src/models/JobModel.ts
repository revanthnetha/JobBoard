const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    title: { type: String,required: true},
    description: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    candidates: [{ type: String }],
    endDate: { type: Date, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "company", required: true },
  }, { timestamps: true });

const db = mongoose.connection;
const jobModel = mongoose.model("company", jobSchema);

export default jobModel;