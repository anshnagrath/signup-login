import express from "express";
import AuthController from "../controllers/AuthController";
const router = express.Router();
router.post("/signup", AuthController.createUser);
export default router;