import {Router} from "express";
import { authController } from './auth.controller';

const authRoute = Router();
const authControllerInstance = new authController();

authRoute.post("/Register", authControllerInstance.register)

// authRoute.post("/login", (req, res) => {
 
//   const user = prisma.user.findFirst({
//     where: {
//       nombre: req.body.nombre,
//     },
//   });

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }else{
//     return res.status(200).json({ message: "User found", user });
//   }

// });


export default authRoute;