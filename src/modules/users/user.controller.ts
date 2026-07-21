import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { editUsuarioSchema, registerUsuario, registroUserSchema } from './user.dto';

const userServiceI = new userService();

export class userController{

    async editUsuario(req:Request, res: Response, next:NextFunction){
        try {
            const usuarioInfo =  editUsuarioSchema.parse(req.body);

            const {idUsuario} = req.params;

            if (!usuarioInfo && !idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            const usuarioEncontrado = userServiceI.getUsuarioById(Number(idUsuario));

            if (!usuarioEncontrado) {
                return res.status(400).json({mensaje: "Usuario no encontrado"})
            }

            const esAdmin = req.esAdmin;

            //validacion para que usuario no editado todos sin permiso
            if (usuarioInfo.id == Number(idUsuario) || esAdmin) {
                const usuarioEditado = await userServiceI.editUsuario(Number(idUsuario), usuarioInfo);
    
                if (usuarioEditado.ok) {
                    return res.status(201).json({
                            mensaje:"Usuario creado exitosamente",
                            usuario: usuarioEditado
                        })
                }else{
                    return res.status(409).json({ mensaje: usuarioEditado.mensaje })
                }
            }else{
                return res.status(409).json({ mensaje: "No tienes permisos para editar este usuario" });
            }


        } catch (error) {
            next(error);
        }
    }

    async deleteUsuario(req:Request, res: Response, next:NextFunction){
        try {
            const {idUsuario} = req.params;

            if (!idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }

            const usuarioEncontrado = await userServiceI.getUsuarioById(Number(idUsuario));

            if (!usuarioEncontrado) {
                return res.status(400).json({mensaje: "Usuario no encontrado"})
            }

            const esAdmin = req.esAdmin;

            if (esAdmin) {
                const usuarioEliminado = await userServiceI.deleteUsuario(Number(idUsuario));

                if (usuarioEliminado.ok) {
                    
                    return res.status(200).json({
                        mensaje:"Usuario eliminado exitosamente",
                        proyecto: usuarioEliminado
                    })
                }else{
                    return res.status(409).json({ mensaje: usuarioEliminado.mensaje })
                }

            }else{
                return res.status(409).json({ mensaje: "No tienes permisos para eliminar usuarios" });
            }

        } catch (error) {
            next(error);
        }
    }

    async getUsuarioById(req:Request, res: Response, next:NextFunction){

        try {
            const {idUsuario} = req.params;
    
            if (!idUsuario) {
                return res.status(400).json({mensaje: "Faltan campos requeridos"})
            }
    
            const usuarioEncontrado = await userServiceI.getUsuarioById(Number(idUsuario));
    
            if (usuarioEncontrado.ok) {
                return res.status(200).json({
                    mensaje:"Usuario consultado exitosamente",
                    proyecto: usuarioEncontrado
                })
            }else{
                return res.status(409).json({ mensaje: usuarioEncontrado.mensaje })
            }
            
        } catch (error) {
            next(error);
        }

    }

    async getUsuarios(req:Request, res: Response, next:NextFunction){

        try {
            const usuariosConsultado = await userServiceI.getUsuarios();

            if (usuariosConsultado.ok) {
                return res.status(200).json({
                    mensaje:"Usuarios consultado exitosamente",
                    proyecto: usuariosConsultado
                })
            }else{
                return res.status(409).json({ mensaje: usuariosConsultado.mensaje })
            }            
        } catch (error) {
            next(error);
        }

    }

}