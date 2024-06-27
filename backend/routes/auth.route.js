import express from "express"
import { login, logoutUser, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register)
router.post("/login",login)
router.post("/logout", logoutUser)
export default router;