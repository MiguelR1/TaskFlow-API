import { NextFunction, Request, Response } from 'express';
import { authService } from './auth.service';
import { RegisterUserDto } from './auth.dto';
import { loginUserSchema, registroUserSchema } from '../users/user.dto';

const authServiceI = new authService();

export class authController {

    async register(req: Request, res: Response, next: NextFunction) {
        
        try {

            const validateData = registroUserSchema.parse(req.body);
            const { nombre, email, password, cedula } = validateData;

            // const { nombre, email, password, cedula } = req.body;

            if (!nombre || !email || !password || !cedula) {
                return res.status(400).json({ mensaje: "Faltan campos requeridos" });
            }

            const nuevoUsuario = await authServiceI.registro({ nombre, email, password, cedula });

            if (nuevoUsuario.ok) {
                return res.status(201).json({ 
                    mensaje: "Usuario registrado exitosamente", 
                    usuario: nuevoUsuario 
                });
            }else{
                return res.status(409).json({mensaje: nuevoUsuario.mensaje})
            }

        } catch (error:any) {
           next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {

            const validateData = loginUserSchema.parse(req.body);
            const { email, password, cedula } = validateData;

            if ((!email && !cedula) || !password) {
                return res.status(400).json({ message: "Faltan campos requeridos" });
            }
            
            const usuarioEncontrado = await authServiceI.login({ email, cedula, password });

            if (usuarioEncontrado.ok) {
                return res.status(200).json({ 
                    mensaje: "Usuario logeado exitosamente", 
                    usuario: usuarioEncontrado.usuario, 
                    token: usuarioEncontrado.token 
                });
            } else {
                return res.status(401).json({ message: usuarioEncontrado.mensaje || "Credenciales inválidas" });
            }

        }catch (error:any) {
           next(error);
        }
    }

}