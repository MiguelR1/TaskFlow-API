import { Router } from 'express';
import { proyectoController } from './projects.controller';
import { checkAdmin } from '../../middlewares/role.Middleware';
import { authMiddleware } from '../../middlewares/authMiddleware';

const projectRouter = Router();
const projectCtrlI = new proyectoController();

const insAuthMiddleware = new authMiddleware();

projectRouter.use(insAuthMiddleware.userAuthMiddleware);
projectRouter.use(checkAdmin);

//Create
projectRouter.post('/createProject', projectCtrlI.crearProyecto)

//Edit
projectRouter.put('/editProject/:idProyecto', projectCtrlI.editarProyecto)

//Select by id
projectRouter.get('/getProyectoById/:idProyecto', projectCtrlI.getProyectoById)

//Eliminar by id
projectRouter.delete('/deleteProject/:idProyecto', projectCtrlI.eliminarProyectoById)

//Select todos
projectRouter.get('/getProyectosByUsuario', projectCtrlI.getProyectosByUsuario)

//select todos los proyectos para admin
projectRouter.get('/getProyectos', projectCtrlI.getProyectos)

export default projectRouter;