import express from 'express';
// import authRoute from './routes/auth.route.js';
import authRoute from "./routes/auth.route.js";

const app = express();
app.use(express.json());

app.use("/api", authRoute);

export {app};

