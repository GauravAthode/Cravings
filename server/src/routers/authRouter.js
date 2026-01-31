import express from "express";
import {
  UserRegister,
  UserLogin,
  UserLogout,
  UserGenOTP
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);

router.post("/genOtp",UserGenOTP)


export default router;