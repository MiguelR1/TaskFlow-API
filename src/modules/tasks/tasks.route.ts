import { Router } from "express";
import { taskController } from "./tasks.controller";
import { checkAdmin } from "../../middlewares/role.Middleware";
import { authMiddleware } from "../../middlewares/authMiddleware";

const taskRouter = Router();

const taskControllerI = new taskController();


const insAuthMiddleware = new authMiddleware();

taskRouter.use(insAuthMiddleware.userAuthMiddleware);
taskRouter.use(checkAdmin);

taskRouter.post('/createTask', taskControllerI.createTarea);

taskRouter.get('/getTaskById', taskControllerI.getTareaById);
taskRouter.get('/getTareas', taskControllerI.getTareasByProyecto);

taskRouter.delete('/deleteTarea', taskControllerI.deleteTarea);

taskRouter.get('/getHorasRegistradas', taskControllerI.getHorasRegistradas);

taskRouter.get('/getTareasCompletadas', taskControllerI.getTareasCompletadas);

export default taskRouter;