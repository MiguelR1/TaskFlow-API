import { NextFunction, Request, Response  } from "express";
import { proyectoService } from "./projects.service";
import { busca_elimina_project_Schema, createProjectSchema, createProjectType, editProjectSchema, projectDto } from "./projects.dto";
import { number } from "zod";


const proyectoServiceI = new proyectoService();

export class proyectoController{

    async crearProyecto(req:Request, res:Response, next:NextFunction){
        try {
            const proyectoNuevo = createProjectSchema.parse(req.body);

            if (!proyectoNuevo) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            //Buscar usuario si existe, y validacion

            const nuevoProyecto = await proyectoServiceI.crearProyecto(proyectoNuevo);

            if (nuevoProyecto.ok) {
                return res.status(201).json({
                    mensaje:"Proyecto creado exitosamente",
                    proyecto: nuevoProyecto
                })
            }else{
                return res.status(409).json({ mensaje: nuevoProyecto.mensaje })
            }

        } catch (error:any) {
            next(error);
        }
    }

    async editarProyecto(req:Request, res:Response, next: NextFunction){
        try {
            const proyectoNuevo = editProjectSchema.parse(req.body);
            const { idProyecto } = req.params;
            const { idUsuario } = req.query;

            if (!proyectoNuevo && !idUsuario && !idProyecto) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            //Validacion existe proyecto
            //Validacion usuario

            const esAdmin = req.esAdmin;

            if (proyectoNuevo.duenoId == Number(idUsuario) || esAdmin) {
                const nuevoProyecto = await proyectoServiceI.editarProyecto(proyectoNuevo, Number(idUsuario), String(idProyecto),esAdmin!);
    
                if (nuevoProyecto.ok) {
                    return res.status(200).json({
                        mensaje:"Proyecto editado exitosamente",
                        proyecto: nuevoProyecto
                    })
                }else{
                    return res.status(409).json({ mensaje: nuevoProyecto.mensaje })
                }
            }else{
                return res.status(409).json({ mensaje: "No tienes permisos para editar este proyecto" });
            }

        } catch (error:any) {
            next(error);
        }
    }

    async eliminarProyectoById(req:Request, res:Response, next:NextFunction){
        try {
            const { idUsuario } = req.query;
            const { idProyecto } = req.params;
            
            if (!idProyecto && !idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            //Validacion existe proyecto
            //Validacion usuario

            const esAdmin = req.esAdmin;

            const proyectoEncontrado = await proyectoServiceI.getProyectoById(String(idProyecto), Number(idUsuario), esAdmin!);

            if (proyectoEncontrado) {

                if (Number(idUsuario) == proyectoEncontrado.proyecto?.duenoId) {
                    
                    const proyectoEliminado = await proyectoServiceI.eliminarProyecto(proyectoEncontrado.proyecto.id, proyectoEncontrado.proyecto.duenoId);

                    if (proyectoEliminado.ok) {
                        return res.status(200).json({
                            mensaje:"Proyecto eliminado exitosamente",
                            usuario:proyectoEliminado
                        })
                    }else{
                        return res.status(409).json({ mensaje: proyectoEliminado.mensaje })
                    }
                }else{
                    return res.status(409).json({ mensaje: "No tienes permisos para eliminar este proyecto" });
                }
            }
        } catch (error:any) {
            next(error);
        }
    }

    //Falta probar estos

    async getProyectoById(req:Request, res:Response, next:NextFunction){
        try {
            const { idProyecto } = req.params;

            const { idUsuario } = req.query;

            //Validacion existe proyecto
            //Validacion usuario

            if (!idProyecto && !idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            const esAdmin = req.esAdmin;

            const proyectoSeleccionado = await proyectoServiceI.getProyectoById(String(idProyecto), Number(idUsuario), esAdmin!);

            if (proyectoSeleccionado.ok) {
                return res.status(200).json({
                    mensaje:"Proyecto obtenido exitosamente",
                    usuario:proyectoSeleccionado
                })
            }else{
                return res.status(409).json({ mensaje: proyectoSeleccionado.mensaje })
            }
        } catch (error:any) {
            next(error);
        }
    }

    async getProyectosByUsuario(req:Request, res:Response, next:NextFunction){
        try {
            const { idUsuario } = req.query;

            if (!idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            //Validacion usuario

            const nuevoProyecto = await proyectoServiceI.getProyectosByUsuarioId(Number(idUsuario));

            if (nuevoProyecto.ok) {
                return res.status(200).json({
                    mensaje:"Proyectos obtenidos exitosamente",
                    usuario:nuevoProyecto
                })
            }else{
                return res.status(409).json({ mensaje: nuevoProyecto.mensaje })
            }

        } catch (error:any) {
            next(error);
        }
    }

    async getProyectos(req:Request, res:Response, next:NextFunction){
        try {
            const { idUsuario } = req.query;

            if (!idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            const esAdmin = req.esAdmin;

            if (esAdmin) {
                const nuevoProyecto = await proyectoServiceI.getProyectos();
    
                if (nuevoProyecto.ok) {
                    return res.status(200).json({
                        mensaje:"Proyectos obtenidos exitosamente",
                        usuario:nuevoProyecto
                    })
                }else{
                    return res.status(409).json({ mensaje: nuevoProyecto.mensaje })
                }
            }else{
                return res.status(409).json({mensaje: "No tiene permisos para traer todos los proyectos"});
            }

        } catch (error:any) {
            next(error);
        }
    }

}