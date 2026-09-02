import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserWithoutPassword } from '../modules/users/user.dto';

export class authMiddleware {

    private static readonly tokenSecreto = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

    public static async verificarToken(req: Request, res: Response, next: NextFunction) {
        const Token = req.headers['authorization'];

        if (!Token) {
            return res.status(401).json({ message: 'Token no proporcionado', token: Token });
        }

        try {
            const decoded = jwt.verify(Token, authMiddleware.tokenSecreto);

            next();
        } catch (error) {
            return res.status(403).json({ message: 'Token inválido' });
        }
    }

    public static async crearToken(usuarioId: number, email: string) {

        const payload = { id: usuarioId, email };

        return jwt.sign(payload, authMiddleware.tokenSecreto, { expiresIn: '1h' });
    }

    public async userAuthMiddleware(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const token = authHeader.split(' ')[1];

        try {
            // Decodificamos el token con la clave secreta
            const decoded = jwt.verify(token, authMiddleware.tokenSecreto) as UserWithoutPassword;

            // Inyectamos la información del usuario en el objeto Request
            req.usuario = decoded;

            console.log('usuario', req.usuario);


            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
    };

}
