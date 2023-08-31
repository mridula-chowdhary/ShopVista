import express from "express"
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js"
import connectDB from "./config/db.js";
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoute.js'

dotenv.config();
connectDB();
// dotenv.config({path:"./config/db.js"})
//rest obj
const app= express();
//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
// 
//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get('/',(req,res)=>{
    res.send('<h1> Welcome to E-commerce app</h1>')
    
})

const PORT= process.env.PORT || 8080;
//run listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
})