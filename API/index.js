import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; // for hidden url
import authRouter from "./routes/auth.route.js";
import { fail } from "assert";

dotenv.config();


mongoose
  .connect(process.env.DbURI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use("/API/auth", authRouter);

//middleware for error handling 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;  // assign status code ,500 is nothing
    const message = err.message || 'Internal server error'
    return  res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
});
