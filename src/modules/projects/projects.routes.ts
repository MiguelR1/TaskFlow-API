import { Router } from 'express';
import { proyectoController } from './projects.controller';
import { checkAdmin } from '../../middlewares/role.Middleware';

const projectRouter = Router();
const projectCtrlI = new proyectoController();

//Create
projectRouter.post('/createProject', projectCtrlI.crearProyecto)

//Edit
projectRouter.put('/editProject/:idProyecto', checkAdmin, projectCtrlI.editarProyecto)

//Select by id
projectRouter.get('/getProyectoById/:idProyecto', checkAdmin, projectCtrlI.getProyectoById)

//Eliminar by id
projectRouter.delete('/deleteProject/:idProyecto', checkAdmin, projectCtrlI.eliminarProyectoById)

//Select todos
projectRouter.get('/getProyectosByUsuario/:idUsuario', checkAdmin, projectCtrlI.getProyectosByUsuario)

//select todos los proyectos para admin
projectRouter.get('/getProyectos', checkAdmin, projectCtrlI.getProyectos)

export default projectRouter;