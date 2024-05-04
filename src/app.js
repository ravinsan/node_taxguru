import express from 'express';
// import authRoute from './routes/auth.route.js';
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api", authRoute);

export {app};

