import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // 1. Si es un error de Zod por validación de esquemas
    const zodIssues = error.issues || error.errors;
    if (zodIssues && Array.isArray(zodIssues)) {
        return res.status(400).json({
            ok: false,
            message: "Error de validación en las credenciales",
            errores: zodIssues.map((err: any) => ({
                campo: err.path.join('.'),
                mensaje: err.message
            }))
        });
    }

    // 2. Si el error viene stringificado en el message (Zod formateado)
    try {
        const parsedError = JSON.parse(error.message);
        if (Array.isArray(parsedError)) {
            return res.status(400).json({
                ok: false,
                message: "Error de validación en las credenciales",
                errores: parsedError.map((err: any) => ({
                    campo: err.path ? err.path.join('.') : 'campo',
                    mensaje: err.message
                }))
            });
        }
    } catch (e) {
        // No era un JSON string, ignoramos el parseo
    }

    // 3. Si es un error de Prisma (ej. Violación de clave única / Duplicados)
    if (error.code && error.code.startsWith('P')) {
        return res.status(409).json({
            ok: false,
            message: "Error en la base de datos",
            detalle: error.meta?.target ? `El campo ${error.meta.target} ya existe.` : error.message
        });
    }

    // 4. Cualquier otro error inesperado del servidor (500)
    console.error("Error interno detectado:", error);
    return res.status(500).json({
        ok: false,
        message: error.message || "Error interno del servidor"
    });
};