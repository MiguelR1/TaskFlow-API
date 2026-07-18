import {prisma} from '../../config/prisma';
import {createProjectType, editProjectType, projectDto} from './projects.dto';

export class proyectoRepository{

    async createProyecto(proyectoData: createProjectType){
        return await prisma.proyecto.create({
            data: proyectoData
        })
    }

    async getProyectoById(idProyecto:string, idUsuario:number, esAdmin:boolean){
        return await prisma.proyecto.findFirst({
            where: {
                id:idProyecto, 
                ...(esAdmin ? {} : { duenoId:idUsuario })
            }
        })
    }

    //Obtener los proyectos que le pertenecen al usuario
    async getProyectosByUsuarioId(id:number){
        return await prisma.proyecto.findMany({
            where: {duenoId:id}
        })
    }

    //Obtener los proyectos 
    async getProyectos(){
        return await prisma.proyecto.findMany()
    }

    async editProyecto(nuevaData: editProjectType, idUsuario:number, idProyecto:string, esAdmin:boolean ){
        return await prisma.proyecto.update({
            where: {
                id: idProyecto,
                ...(esAdmin ? {} : { duenoId:idUsuario })
            },
            data: nuevaData
        })
    }

    async eliminarProyecto(idProyecto:string, idUsuario:number){
        return await prisma.proyecto.delete({
            where: {id:idProyecto, duenoId:idUsuario}
        })
    }

}