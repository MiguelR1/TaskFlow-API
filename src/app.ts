import express from "express";
import cors from "cors";

import authRoute from "../src/modules/auth/auth.routes";
import projectRoute from "../src/modules/projects/projects.routes";

import { authMiddleware } from "./middlewares/authMiddleware";
import { errorMiddleware } from "./middlewares/req.Middleware";
import userRouter from "./modules/users/user.routes";
import taskRouter from "./modules/tasks/tasks.route";

const app = express();
const PORT = process.env.PORT || 3000;

//Configuracion de CORS para permitir peticiones desde cualquier origen
app.use(cors());

app.use(express.json());

//Authentication
app.use("/api/auth", authRoute);

//Projects
app.use("/api/projects", projectRoute);

//Users
app.use("/api/users", userRouter);

//Tasks
app.use("/api/tasks", taskRouter);

//Middleware para mostrar errores tipados estrictos con Zod
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
