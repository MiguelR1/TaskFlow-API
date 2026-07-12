import {prisma} from '../../config/prisma';
import {projectDto} from './projects.dto';

export class proyectoRepository{

    async createProyecto(proyectoData: projectDto){
        return await prisma.proyecto.create({
            data: proyectoData
        })
    }

    async getProyectoById(idProyecto:string, idUsuario:number){
        return await prisma.proyecto.findFirst({
            where: {id:idProyecto, duenoId:idUsuario}
        })
    }

    //Obtener los proyectos que le pertenecen al usuario
    async getProyectosByUsuarioId(id:number){
        return await prisma.proyecto.findMany({
            where: {duenoId:id}
        })
    }

    async editProyecto(nuevaData: projectDto, idUsuario:number){
        return await prisma.proyecto.update({
            where: {id: nuevaData.id, duenoId: idUsuario},
            data: nuevaData
        })
    }

    async eliminarProyecto(idProyecto:string, idUsuario:number){
        return await prisma.proyecto.delete({
            where: {id:idProyecto, duenoId:idUsuario}
        })
    }

}