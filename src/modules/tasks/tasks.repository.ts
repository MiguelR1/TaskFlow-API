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



}