import express from "express";
import AuthController from "../controllers/AuthController";
const router = express.Router();
router.post("/signup", AuthController.createUser);
router.post("/verify", AuthController.verifyUser);
export default router;