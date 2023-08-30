import express from "express";
import {registerController,loginController,testController,updateProfileController} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";


const router=express.Router();
//routing
//register || method post
router.post("/register",registerController)
//Login ||method post
router.post("/login",loginController);
//test routes
router.get("/test", requireSignIn,isAdmin, testController);
//protected route auth
router.get("/user-auth",requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
  
router.put('/profile',requireSignIn,updateProfileController)

export default router;