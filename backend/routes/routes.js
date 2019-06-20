import express from "express";
import AuthController from "../controllers/AuthController";
import ProductController from "../controllers/ProductController"
import checktoken from '../middlewares/authenticate'
const router = express.Router();
router.post("/signup", AuthController.createUser);
router.get("/verify", AuthController.verifyUser);
router.post("/login", AuthController.authenticateUser);
router.post("/product",checktoken,ProductController.saveProducts);
router.get("/product",checktoken,ProductController.getProducts);

export default router;