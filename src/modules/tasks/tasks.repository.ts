import { Estado } from "../../../generated/prisma/enums";
import { prisma } from "../../config/prisma";
import { editTarea, editTareaT, registroTareaT } from "./tasks.dto";

export class taskRepository {

    async createTarea(dataTarea: registroTareaT, idUsuario: number) {
        return await prisma.tarea.create({
            data: {
                ...dataTarea,
                creadorId: idUsuario
            }
        })
    }

    async editTarea(idTarea: string, dataTarea: editTareaT) {
        return await prisma.tarea.update(
            { data: dataTarea, where: { id: idTarea } }
        )
    }

    async editStatus(idTarea: string, status: Estado) {
        return await prisma.tarea.update({
            data: { estado: status },
            where: { id: idTarea }
        })
    }

    async getTareaById(idTarea: string) {
        return await prisma.tarea.findUnique({
            where: { id: idTarea }
        })
    }

    async getTareasByProyecto(idProyecto: string) {
        return await prisma.tarea.findMany({
            where: { proyectoId: idProyecto }
        })
    }

    async deleteTarea(idTarea: string) {
        return await prisma.tarea.delete({
            where: { id: idTarea }
        });
    }

    //buscar tareas completadas por proyecto
    async getTareasCompletadas(idUsuario: number) {
        const tareasCompletadas = await prisma.tarea.count({
            where: {
                proyecto: {
                    duenoId: idUsuario
                },
                estado: 'Terminado'
            }
        })

        return tareasCompletadas;
    }

    //buscar horas registradas

    async getHorasRegistradas(idUsuario: number) {
        const horasRegistradas = await prisma.tarea.aggregate({
            where: {
                proyecto: {
                    duenoId: idUsuario
                }
            },
            _sum: {
                horasEstimadas: true
            }
        })

        const valorHoras = horasRegistradas._sum.horasEstimadas ? null : 0;

        return valorHoras;
    }

    //Seccion comentarios
    // 1. Insertar comentario
    async createComentario(contenido: string, tareaId: string, autorId: number) {
        try {
            const nuevoComentario = await prisma.comentario.create({
                data: {
                    contenido,
                    tareaId,
                    autorId,
                    fecha: new Date()
                }
            });
            return nuevoComentario;
        } catch (error) {
            console.error("Error al crear comentario:", error);
            return null;
        }
    }

    // 2. Obtener comentarios por tareaId y autorId
    async getComentariosByTareaYUsuario(tareaId: string, autorId: number) {
        try {
            const comentarios = await prisma.comentario.findMany({
                where: {
                    tareaId,
                    autorId
                },
                orderBy: {
                    fecha: 'asc'
                }
            });
            return comentarios;
        } catch (error) {
            console.error("Error al obtener comentarios por tarea y usuario:", error);
            return null;
        }
    }



}