import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

export class authMiddleware {
    
    private static readonly tokenSecreto = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

    public static async verificarToken(req: Request, res: Response, next: NextFunction) {
        const Token = req.headers['authorization'];
    
        if (!Token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
    
        try {
            const decoded = jwt.verify(Token, authMiddleware.tokenSecreto);
    
            next();
        }catch (error) {
            return res.status(403).json({ message: 'Token inválido' });
        }
    }

    public static async crearToken(usuarioId:number,email:string){
        
        const payload = { id: usuarioId, email };

        return jwt.sign(payload, authMiddleware.tokenSecreto, { expiresIn: '1h' });
    }

}
