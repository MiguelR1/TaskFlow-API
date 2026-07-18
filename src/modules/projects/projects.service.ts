import { proyectoRepository } from './projects.repository';
import { createProjectType, editProjectType, projectDto } from './projects.dto';

const proyectoRepositoryI = new proyectoRepository();

export class proyectoService{

    async crearProyecto(proyectoData: createProjectType){
        const proyectoCreado = await proyectoRepositoryI.createProyecto(proyectoData);

        if (proyectoCreado) {
            return {ok:true, proyecto: proyectoCreado}
        }else{
            return {ok:false, mensaje:'Hubo un error al crear el proyecto'}
        }
    }

    async editarProyecto(proyectoData:editProjectType, idUsuario:number, idProyecto:string, esAdmin:boolean){
        const proyectoEditado = await proyectoRepositoryI.editProyecto(proyectoData, idUsuario, idProyecto, esAdmin);
    
        if (proyectoEditado) {
            return {ok:true, proyecto:proyectoEditado}
        }else{
            return {ok:false, mensaje:'Hubo un error al editar el proyecto'}
        }
    }

    async eliminarProyecto(idProyecto:string, idUsuario:number){
        const proyectoEliminado = await proyectoRepositoryI.eliminarProyecto(idProyecto, idUsuario);

        if (proyectoEliminado) {
            return {ok:true, proyecto:proyectoEliminado}
        }else{
            return {ok:false, mensaje:'Hubo un error al eliminar el proyecto'}
        }
    }

    async getProyectoById(idProyecto:string, idUsuario:number, esAdmin:boolean){
        const proyectoId = await proyectoRepositoryI.getProyectoById(idProyecto,idUsuario, esAdmin);

        if (proyectoId) {
            return {ok:true, proyecto:proyectoId}
        }else{
            return {ok:false, mensaje:'No existe el proyecto'}
        }
    }

    async getProyectosByUsuarioId(idUsuario:number){
        const proyectosId = await proyectoRepositoryI.getProyectosByUsuarioId(idUsuario);

        if (proyectosId.length > 0) {
            return {ok:true, proyecto:proyectosId}
        }else{
            return {ok:false, mensaje:'No se encontraron proyectos'}
        }
    }

    async getProyectos(){
        const proyectosId = await proyectoRepositoryI.getProyectos();

        if (proyectosId.length > 0) {
            return {ok:true, proyecto:proyectosId}
        }else{
            return {ok:false, mensaje:'No se encontraron proyectos'}
        }
    }

}