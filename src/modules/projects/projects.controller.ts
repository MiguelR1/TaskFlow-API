import { Request, Response  } from "express";
import { proyectoService } from "./projects.service";
import { projectDto } from "./projects.dto";


const proyectoServiceI = new proyectoService();

export class proyectoController{

    async crearProyecto(req:Request, res:Response){
        try {
            const proyectoNuevo: projectDto = req.body;

            if (!proyectoNuevo) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

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
            res.status(500).json({mensaje: error.message || "Error creando el proyecto"});
        }
    }

    async editarProyecto(req:Request, res:Response){
        try {
            const {proyectoNuevo, idUsuario} = req.body;

            if (!proyectoNuevo && !idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            const nuevoProyecto = await proyectoServiceI.editarProyecto(proyectoNuevo, idUsuario);

            if (nuevoProyecto.ok) {
                return res.status(201).json({
                    mensaje:"Proyecto editado exitosamente",
                    proyecto: nuevoProyecto
                })
            }else{
                return res.status(409).json({ mensaje: nuevoProyecto.mensaje })
            }

        } catch (error:any) {
            res.status(500).json({mensaje: error.message || "Error editando el proyecto"});
        }
    }

    async eliminarProyectoById(req:Request, res:Response){
        try {
            const {idProyecto, idUsuario}= req.body;

            if (!idProyecto && !idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            const proyectoEliminado = await proyectoServiceI.eliminarProyecto(idProyecto, idUsuario);

            if (proyectoEliminado.ok) {
                return res.status(201).json({
                    mensaje:"Proyecto eliminado exitosamente",
                    usuario:proyectoEliminado
                })
            }else{
                return res.status(409).json({ mensaje: proyectoEliminado.mensaje })
            }
        } catch (error:any) {
            res.status(500).json({mensaje: error.message || "Error creando el proyecto"});
        }
    }

    async getProyectoById(req:Request, res:Response){
        try {
            const {idProyecto, idUsuario} = req.body;

            if (!idProyecto && !idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            const proyectoSeleccionado = await proyectoServiceI.getProyectoById(idProyecto, idUsuario);

            if (proyectoSeleccionado.ok) {
                return res.status(201).json({
                    mensaje:"Proyecto obtenido exitosamente",
                    usuario:proyectoSeleccionado
                })
            }else{
                return res.status(409).json({ mensaje: proyectoSeleccionado.mensaje })
            }
        } catch (error:any) {
            res.status(500).json({mensaje: error.message || "Error buscando el proyecto"});
        }
    }

    async getProyectos(req:Request, res:Response){
        try {
            const { idUsuario } = req.body;

            if (!idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            const nuevoProyecto = await proyectoServiceI.getProyectosByUsuarioId(idUsuario);

            if (nuevoProyecto.ok) {
                return res.status(201).json({
                    mensaje:"Proyectos obtenidos exitosamente",
                    usuario:nuevoProyecto
                })
            }else{
                return res.status(409).json({ mensaje: nuevoProyecto.mensaje })
            }

        } catch (error:any) {
            res.status(500).json({mensaje: error.message || "Error obteniendo proyectos"});
        }
    }

}