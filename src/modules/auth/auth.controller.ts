import {Request, Response} from 'express';
import { authService } from './auth.service';
import { RegisterUserDto } from './auth.dto';

const authServiceI = new authService();

export class authController {

    async register(req: Request, res: Response) {
        
        try {
            const { nombre, email, password, cedula }: RegisterUserDto = req.body;

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
            res.status(500).json({ message: error.message || "Error registrando usuario" });
        }
    }

}