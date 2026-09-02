import { Request, Response, NextFunction } from 'express';
import { taskService } from './tasks.service';
import { editTarea, registroTarea } from './tasks.dto';
import { userService } from '../users/user.service';
import { proyectoService } from '../projects/projects.service';

const userServiceI = new userService();
const tareaServiceI = new taskService();
const proyectoServiceI = new proyectoService();


export class taskController {


    async createTarea(req: Request, res: Response, next: NextFunction) {

        const idUsuario = req.usuario.id;
        const dataTarea = registroTarea.parse(req.body);

        if (!idUsuario || !dataTarea) {
            return res.status(400).json({ mensaje: "Faltan campos requeridos" })
        }

        const usuarioExiste = await userServiceI.getUsuarioById(Number(idUsuario));

        if (!usuarioExiste) {
            return res.status(404).json({ mensaje: "El usuario no existe" });
        }

        const proyectoExiste = await proyectoServiceI.getProyectoById(String(dataTarea.proyectoId), Number(idUsuario), false);

        if (!proyectoExiste.ok) {
            return res.status(404).json({ mensaje: "El proyecto no existe" });
        }

        const esAdmin = req.esAdmin;

        //validacion para que usuario no editado todos sin permiso
        if (proyectoExiste.proyecto?.duenoId == Number(idUsuario) || esAdmin) {

            const tareaCreada = await tareaServiceI.createTarea(Number(idUsuario), dataTarea);

            if (tareaCreada.ok) {
                return res.status(200).json({
                    mensaje: "Tarea creada exitosamente",
                    tarea: tareaCreada.tarea
                })
            } else {
                return res.status(409).json({ mensaje: tareaCreada.mensaje })
            }

        } else {

            return res.status(409).json({ mensaje: "No tienes permisos para crear tareas en este proyecto" });

        }


    }

    async editTarea(req: Request, res: Response, next: NextFunction) {

        const { idUsuario } = req.params;
        const dataTarea = editTarea.parse(req.body);
        const { idProyecto, idTarea } = req.query;

        if (!idUsuario || !dataTarea || !idProyecto) {
            return res.status(400).json({ mensaje: "Faltan campos requeridos" })
        }


        const usuarioExiste = await userServiceI.getUsuarioById(Number(idUsuario));

        if (!usuarioExiste) {
            return res.status(404).json({ mensaje: "El usuario no existe" });
        }

        const proyectoExiste = await proyectoServiceI.getProyectoById(String(idProyecto), Number(idUsuario), false);

        if (!proyectoExiste) {
            return res.status(404).json({ mensaje: "El proyecto no existe" });
        }

        const tareaEncontrada = await tareaServiceI.getTareaById(
            Number(idUsuario),
            String(idProyecto),
            String(idTarea)
        );

        if (!tareaEncontrada) {
            return res.status(404).json({ mensaje: "La tarea no existe" });
        }

        const esAdmin = req.esAdmin;

        //validacion para que usuario no editado todos sin permiso
        if (proyectoExiste.proyecto?.duenoId == Number(idUsuario) || esAdmin) {

            const tareaEditada = await tareaServiceI.editTarea(
                String(idTarea),
                Number(idUsuario),
                String(idProyecto),
                dataTarea)

            if (tareaEditada.ok) {
                return res.status(200).json({
                    mensaje: "Tarea editada exitosamente",
                    tarea: tareaEditada.tarea
                })
            } else {
                return res.status(409).json({ mensaje: tareaEditada.mensaje })
            }

        } else {

            return res.status(409).json({ mensaje: "No tienes permisos para editar tareas en este proyecto" });

        }

    }

    async getTareaById(req: Request, res: Response, next: NextFunction) {

        const idUsuario = req.usuario.id;

        const { idProyecto, idTarea } = req.query;


        if (!idUsuario || !idProyecto) {
            return res.status(400).json({ mensaje: "Faltan campos requeridos" })
        }

        const usuarioExiste = await userServiceI.getUsuarioById(Number(idUsuario));

        if (!usuarioExiste) {
            return res.status(404).json({ mensaje: "El usuario no existe" });
        }

        const proyectoExiste = await proyectoServiceI.getProyectoById(String(idProyecto), Number(idUsuario), false);

        if (!proyectoExiste) {
            return res.status(404).json({ mensaje: "El proyecto no existe" });
        }

        const esAdmin = req.esAdmin;

        //validacion para que usuario no editado todos sin permiso
        if (proyectoExiste.proyecto?.duenoId == Number(idUsuario) || esAdmin) {

            const tareaEncontrada = await tareaServiceI.getTareaById(
                Number(idUsuario),
                String(idProyecto),
                String(idTarea)
            );

            if (tareaEncontrada.ok) {
                return res.status(200).json({
                    mensaje: "Tarea consultada exitosamente",
                    tarea: tareaEncontrada.tarea
                })
            } else {
                return res.status(409).json({ mensaje: tareaEncontrada.mensaje })
            }

        } else {

            return res.status(409).json({ mensaje: "No tienes permisos para consultar tarea en este proyecto" });

        }



    }

    async getTareasByProyecto(req: Request, res: Response, next: NextFunction) {

        const idUsuario = req.usuario.id;

        const { idProyecto } = req.query;

        if (!idUsuario || !idProyecto) {
            return res.status(400).json({ mensaje: "Faltan campos requeridos" })
        }

        const usuarioExiste = await userServiceI.getUsuarioById(Number(idUsuario));

        if (!usuarioExiste) {
            return res.status(404).json({ mensaje: "El usuario no existe" });
        }

        const proyectoExiste = await proyectoServiceI.getProyectoById(String(idProyecto), Number(idUsuario), false);

        if (!proyectoExiste) {
            return res.status(404).json({ mensaje: "El proyecto no existe" });
        }

        const esAdmin = req.esAdmin;

        //validacion para que usuario no editado todos sin permiso
        if (proyectoExiste.proyecto?.duenoId == Number(idUsuario) || esAdmin) {

            const tareasEncontrada = await tareaServiceI.getTareasByProyecto(
                String(idProyecto)
            );

            if (tareasEncontrada.ok) {
                return res.status(200).json({
                    mensaje: "Tareas consultada exitosamente",
                    tarea: tareasEncontrada.tarea
                })
            } else {
                return res.status(409).json({ mensaje: tareasEncontrada.mensaje })
            }

        } else {

            return res.status(409).json({ mensaje: "No tienes permisos para consultar tareas en este proyecto" });

        }

    }

    async deleteTarea(req: Request, res: Response, next: NextFunction) {
        const idUsuario = req.usuario.id;

        const { idProyecto, idTarea } = req.query;

        if (!idUsuario || !idProyecto) {
            return res.status(400).json({ mensaje: "Faltan campos requeridos" })
        }

        const usuarioExiste = await userServiceI.getUsuarioById(Number(idUsuario));

        if (!usuarioExiste) {
            return res.status(404).json({ mensaje: "El usuario no existe" });
        }

        const proyectoExiste = await proyectoServiceI.getProyectoById(String(idProyecto), Number(idUsuario), false);

        if (!proyectoExiste) {
            return res.status(404).json({ mensaje: "El proyecto no existe" });
        }

        const tareaEncontrada = await tareaServiceI.getTareaById(
            Number(idUsuario),
            String(idProyecto),
            String(idTarea)
        );

        if (!tareaEncontrada) {
            return res.status(404).json({ mensaje: "La tarea no existe" });
        }

        const esAdmin = req.esAdmin;

        //validacion para que usuario no editado todos sin permiso
        if (proyectoExiste.proyecto?.duenoId == Number(idUsuario) || esAdmin) {
            const tareaEliminada = await tareaServiceI.deleteTarea(
                String(idTarea)
            );

            if (tareaEliminada.ok) {
                return res.status(200).json({
                    mensaje: "Tarea eliminada exitosamente",
                    tarea: tareaEliminada.tarea
                })
            } else {
                return res.status(409).json({ mensaje: tareaEliminada.mensaje })
            }

        } else {
            return res.status(409).json({ mensaje: "No tienes permisos para eliminar tareas en este proyecto" });
        }
    }

    async getHorasRegistradas(req: Request, res: Response, next: NextFunction) {
        const idUsuario = req.usuario.id;

        if (!idUsuario) {
            return res.status(400).json({ mensaje: "Faltan campos requeridos" })
        }

        const usuarioExiste = await userServiceI.getUsuarioById(Number(idUsuario));

        if (!usuarioExiste) {
            return res.status(404).json({ mensaje: "El usuario no existe" });
        }

        const horasRegistradas = await tareaServiceI.getHorasRegistradas(Number(idUsuario));

        if (horasRegistradas.ok) {

            return res.status(200).json({
                mensaje: "Horas registradas consultadas exitosamente",
                horas: horasRegistradas.horas
            })
        } else {
            return res.status(409).json({ mensaje: horasRegistradas.mensaje })
        }
    }

    async getTareasCompletadas(req: Request, res: Response, next: NextFunction) {
        const idUsuario = req.usuario.id;

        if (!idUsuario) {
            return res.status(400).json({ mensaje: "Faltan campos requeridos" })
        }

        const usuarioExiste = await userServiceI.getUsuarioById(Number(idUsuario));

        if (!usuarioExiste) {
            return res.status(404).json({ mensaje: "El usuario no existe" });
        }

        const tareasCompletadas = await tareaServiceI.getTareasCompletadas(idUsuario);

        if (tareasCompletadas.ok) {
            return res.status(200).json({
                mensaje: "Tareas completadas consultadas exitosamente",
                tareas: tareasCompletadas.tareas
            })
        } else {
            return res.status(409).json({ mensaje: tareasCompletadas.mensaje })
        }
    }
}
