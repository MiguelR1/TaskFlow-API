import {Request, Response} from 'express';
import { authService } from './auth.service';

const authServiceI = new authService();


export class authController {

    async register(req: Request, res: Response) {
        
        try {

            const { nombre, email, password } = req.body;
            
            if (!nombre || !email || !password) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const nuevoUsuario = await authServiceI.registro({ nombre, email, password });

            return res.status(201).json({ message: "User registered successfully", usuario: nuevoUsuario });

        } catch (error:any) {
            res.status(500).json({ message: error.message || "Error registering user" });
        }
    }

}