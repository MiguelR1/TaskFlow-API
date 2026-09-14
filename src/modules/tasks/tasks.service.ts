import { proyectoService } from "../projects/projects.service";
import { editTareaT, registroTareaT, tareaDto } from "./tasks.dto";
import { taskRepository } from "./tasks.repository";
import { userService } from '../users/user.service';
import { Estado } from "../../../generated/prisma/enums";

export class taskService {

    tareaRepositoryI = new taskRepository();

    proyectoServiceI = new proyectoService();

    userServiceI = new userService();

    async createTarea(idUsuario: number, dataTarea: registroTareaT) {

        const tareaCreada = await this.tareaRepositoryI.createTarea(dataTarea, idUsuario);

        if (tareaCreada) {
            return {
                ok: true,
                mensaje: "Tarea creada exitosamente",
                tarea: tareaCreada
            };
        } else {
            return {
                ok: false,
                mensaje: "Ocurrio un error al crear la tarea"
            };
        }
    }

    async editTarea(idTarea: string, idUsuario: number, idProyecto: string, dataTarea: editTareaT) {

        const tareaEditada = await this.tareaRepositoryI.editTarea(idTarea, dataTarea);

        if (tareaEditada) {
            return {
                ok: true,
                mensaje: "Tarea editada exitosamente",
                tarea: tareaEditada
            };
        } else {
            return {
                ok: false,
                mensaje: "Ocurrio un error al editar la tarea"
            };
        }
    }

    async editStatusTarea(idTarea: string, estado: Estado) {

        const tareaEditada = await this.tareaRepositoryI.editStatus(idTarea, estado);

        if (tareaEditada) {
            return {
                ok: true,
                mensaje: "Tarea editada exitosamente",
                tarea: tareaEditada
            };
        } else {
            return {
                ok: false,
                mensaje: "Ocurrio un error al editar la tarea"
            };
        }
    }

    async getTareaById(idUsuario: number, idProyecto: string, idTarea: string) {


        const tareaEncontrada = await this.tareaRepositoryI.getTareaById(idTarea);

        if (tareaEncontrada) {
            return {
                ok: true,
                mensaje: "Tarea consultada exitosamente",
                tarea: tareaEncontrada
            };
        } else {
            return {
                ok: false,
                mensaje: "Ocurrio un error al consultar la tarea"
            };
        }

    }

    async getTareasByProyecto(idProyecto: string) {


        const tareasEncontrada = await this.tareaRepositoryI.getTareasByProyecto(idProyecto);

        if (tareasEncontrada) {
            return {
                ok: true,
                mensaje: "Tarea creada exitosamente",
                tarea: tareasEncontrada
            };
        } else {
            return {
                ok: false,
                mensaje: "Ocurrio un error al crear la tarea"
            };
        }
    }

    async deleteTarea(idTarea: string) {
        const tareaEliminada = await this.tareaRepositoryI.deleteTarea(idTarea);

        if (tareaEliminada) {
            return {
                ok: true,
                mensaje: "Tarea eliminada exitosamente",
                tarea: tareaEliminada
            };
        } else {
            return {
                ok: false,
                mensaje: "Ocurrio un error al eliminar la tarea"
            };
        }

    }

    //Obtener tareas completadas por proyecto
    async getTareasCompletadas(idUsuario: number) {
        const tareasCompletadas = await this.tareaRepositoryI.getTareasCompletadas(idUsuario);

        if (tareasCompletadas != null) {
            return {
                ok: true,
                mensaje: "Tareas completadas consultadas exitosamente",
                tareas: tareasCompletadas
            };
        } else {
            return {
                ok: false,
                mensaje: "Ocurrio un error al consultar las tareas completadas"
            };
        }
    }

    //Obtener horas registradas por usuario
    async getHorasRegistradas(idUsuario: number) {
        const horasRegistradas = await this.tareaRepositoryI.getHorasRegistradas(idUsuario);

        if (horasRegistradas != null) {

            return {
                ok: true,
                mensaje: "Horas registradas consultadas exitosamente",
                horas: horasRegistradas
            };
        } else {
            return {
                ok: false,
                mensaje: "Ocurrio un error al consultar las horas registradas"
            };
        }
    }
}