import express from "express";
import AuthController from "../controllers/AuthController";
import ProductController from "../controllers/ProductController"
import checktoken from '../middlewares/authenticate'
const router = express.Router();
router.post("/signup", AuthController.createUser);
router.get("/verify", AuthController.verifyUser);
router.post("/login", AuthController.authenticateUser);
router.get("/saveProducts/",checktoken,AuthController.getUserProducts);
router.post("/saveProducts/",checktoken,AuthController.addToProductList);
router.get("/getUserProducts/:userId",checktoken,ProductController.getUserProducts);
router.get("/getproducts",checktoken,ProductController.getProducts);
export default router;