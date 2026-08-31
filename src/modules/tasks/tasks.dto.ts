import z from "zod";
import { Estado } from "../../../generated/prisma/browser";

export const tareaDto = z.object({
    id: z.string(),
    titulo: z.string(),
    descripcion: z.string().optional(),
    estado: z.nativeEnum(Estado),
    proyectoId: z.string(),
    creadorId: z.number(),
    asignadorId: z.number().optional(),
    fechaTerminada: z.string().optional(),
    horasEstimadas: z.number()
});

export const registroTarea = tareaDto.omit({ id: true, creadorId: true });
export type registroTareaT = z.infer<typeof registroTarea>;

export const editTarea = tareaDto;
export type editTareaT = z.infer<typeof editTarea>; 