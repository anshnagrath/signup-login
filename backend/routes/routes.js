import express from "express";
import AuthController from "../controllers/AuthController";
import ProductController from "../controllers/ProductController"
import checktoken from '../middlewares/authenticate'
const router = express.Router();
router.get('/',function(req,res){res.send("welcome to api")})
router.post("/api/signup", AuthController.createUser);
router.get("/api/verify", AuthController.verifyUser);
router.post("/api/login", AuthController.authenticateUser);
router.get("/api/saveProducts/",checktoken,AuthController.getUserProducts);
router.post("/api/saveProducts/",checktoken,AuthController.addToProductList);
router.get("/api/getuserproducts/:id",checktoken,AuthController.getUserProducts);
router.get("/api/getproducts",checktoken,ProductController.getProducts);
export default router;
