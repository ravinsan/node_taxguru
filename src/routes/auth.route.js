import { Router } from "express";
import {  signup, signin } from "../controllers/auth.js";
import { verifyJWT } from "../middleware/user.middleware.js";

const route = Router();

route.post("/signup", signup);
route.post('/signin',verifyJWT, signin);

export default route;
