import {Router} from "express";
import { authController } from './auth.controller';

const authRoute = Router();
const authControllerInstance = new authController();

authRoute.get("/Register", authControllerInstance.register);

authRoute.get("/Login", authControllerInstance.login);


export default authRoute;