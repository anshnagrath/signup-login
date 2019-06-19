import express from "express";
import AuthController from "../controllers/AuthController";
const router = express.Router();
router.post("/signup", AuthController.createUser);
router.get("/verify", AuthController.verifyUser);
router.post("/login", AuthController.authenticateUser);
export default router;