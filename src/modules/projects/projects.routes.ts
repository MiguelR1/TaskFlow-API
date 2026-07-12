import { Router } from 'express';
import { proyectoController } from './projects.controller';

const projectRouter = Router();
const projectCtrlI = new proyectoController();

//Create
projectRouter.post('/createProject', projectCtrlI.crearProyecto)

//Select todos

//Select by id

//Eliminar by id

export default projectRouter;