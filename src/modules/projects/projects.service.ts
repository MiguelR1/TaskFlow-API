import { proyectoRepository } from './projects.repository';
import { projectDto } from './projects.dto';

const proyectoRepositoryI = new proyectoRepository();

export class proyectoService{

    async crearProyecto(proyectoData: projectDto){
        const proyectoCreado = await proyectoRepositoryI.createProyecto(proyectoData);

        if (proyectoCreado) {
            return {ok:true, proyecto: proyectoCreado}
        }else{
            return {ok:false, mensaje:'Hubo un error al crear el proyecto'}
        }
    }

    async editarProyecto(proyectoData:projectDto, idUsuario:number){
        const proyectoEditado = await proyectoRepositoryI.editProyecto(proyectoData, idUsuario);
    
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

    async getProyectoById(idProyecto:string, idUsuario:number){
        const proyectoId = await proyectoRepositoryI.getProyectoById(idProyecto,idUsuario);

        if (proyectoId) {
            return {ok:true, proyecto:proyectoId}
        }else{
            return {ok:false, mensaje:'Hubo un error al obtener informacion del proyecto'}
        }
    }

    async getProyectosByUsuarioId(idUsuario:number){
        const proyectosId = await proyectoRepositoryI.getProyectosByUsuarioId(idUsuario);

        if (proyectosId) {
            return {ok:true, proyecto:proyectosId}
        }else{
            return {ok:false, mensaje:'Hubo un error al obtener informacion del proyecto'}
        }
    }

}