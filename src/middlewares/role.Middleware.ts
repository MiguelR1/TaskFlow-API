import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';

export const checkAdmin = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const { idUsuario } = req.query;

        if (!idUsuario) {
            req.esAdmin = false;
            return next();
        }

        const usuario = await prisma.usuario.findUnique({
            where: {id: Number(idUsuario)},
            select: { rol: true }
        })

        if (usuario && usuario.rol == 'Admin') {
            req.esAdmin = true;
        }else{
            req.esAdmin = false;
        }

        next();
    } catch (error) {
        next(error);
    }
}