const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  phoneNo: { type: Number, required: true, unique: true },
  companyName: { type: String, required: true },
  companyEmail: { type: String, required: true, unique: true },
  companySize: { type: Number, required: true },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationCode: { type: String },
  isPhoneVerified: { type: Boolean, default: false },
  phoneVerificationCode: { type: String },
});

const db = mongoose.connection;
const CompanyModel = mongoose.model("company", companySchema);

module.exports = CompanyModel;
