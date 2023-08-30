import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken";


export const registerController =async(req,res)=>{

   try{
      const {name,email,password,phone,address}=req.body;
      //validation
      if (!name) {
        return res.send({ message: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if (!phone) {
        return res.send({ message: "Phone no is Required" });
      }
      if (!address) {
        return res.send({ message: "Address is Required" });
      }
      //check user
      const existingUser = await userModel.findOne({email});
      if(existingUser){
          return res.status(200).send({
            success:false,
            message:"Already register please Login ",
          });
      }
      //
      const hashedPassword= await hashPassword(password);

      const user= await new userModel({name,email,phone,address,password:hashedPassword}).save()
      res.status(201).send({
    success:true,
    message:" User Registered Successfully",
    user,
});  }
   catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:" Error in Registration",
        error,
    });
   } 
};
//POST LOGIN 
export const loginController=async(req,res)=>{
 try{
   const {email,password}=req.body;
   //validation
   if(!email || !password){
    return res.status(404).send({
      success:false,
      message:"Invalid email or password",
    });
   }
 
 const user= await userModel.findOne({email})
 if(!user){
  return res.status(404).send({
    success :false,
    message:"Email is not registered"
  })
 }
 const match = await comparePassword(password,user.password)
 if(!match){
  return res.status(200).send({
    success:false,
    message:"Invalid password"
  });
 }
 const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});
res.status(200).send({
  success: true,
  message: "login successfully",
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
  },
  token,
});
} catch (error) {
console.log(error);
res.status(500).send({
  success: false,
  message: "Error in login",
  error,
});
}
};

//test controller
export const testController = (req, res) => {
try {
res.send("Protected Routes");
} catch (error) {
console.log(error);
res.send({ error });
}
};
//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};