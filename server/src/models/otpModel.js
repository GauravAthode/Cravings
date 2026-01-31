import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    expires: 300, //time in seconds
  },
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;