import express from "express";

import authRoute from "../src/modules/auth/auth.routes";
import projectRoute from "../src/modules/projects/projects.routes";

import { authMiddleware } from "./middlewares/authMiddleware";
import { errorMiddleware } from "./middlewares/req.Middleware";
import userRouter from "./modules/users/user.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Authentication
app.use("/api/auth", authRoute);

//Projects
app.use("/api/projects", projectRoute);

//Users
app.use("/api/users", userRouter)

//Middleware para mostrar errores tipados estrictos con Zod
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
