import { registerUsuario } from './user.dto';
import { userRepository } from './user.repository';

export class userService {

    userRepositoryI = new userRepository();

    async editUsuario(idUsuario:number, dataUser: registerUsuario){

        const userExiste = this.userRepositoryI.getUsuarioById(idUsuario);

        if (!userExiste) {
            return { ok: false, mensaje: "El usuario no está registrado" };
        }

        const userEditado = this.userRepositoryI.editUsuario(idUsuario, dataUser);

        if (userEditado) {
            return {
                ok: true, 
                mensaje:"Usuario editado exitosamente", 
                usuario: userEditado
            };
        }else{
            return {
                ok: false, 
                mensaje:"Ocurrio un error al editar al usuario"
            };
        }
    }

    async deleteUsuario(idUsuario:number){
        const userExiste = this.userRepositoryI.getUsuarioById(idUsuario);

        if (!userExiste) {
            return { ok: false, mensaje: "El usuario no está registrado" };
        }

        const userEliminado = this.userRepositoryI.deleteUsuario(idUsuario);

        if (userEliminado) {
            return {
                ok: true, 
                mensaje:"Usuario eliminado exitosamente", 
                usuario: userEliminado
            };
        }else{
            return {
                ok: false, 
                mensaje:"Ocurrio un error al eliminar al usuario"
            };
        }
    }

    async getUsuarioById(idUsuario:number){
        const usuarioEncontrado = await this.userRepositoryI.getUsuarioById(idUsuario);

        if (usuarioEncontrado) {
            return {
                ok: true,
                usuario: usuarioEncontrado
            };
        }else{
            return {
                ok: false, 
                mensaje:"Ocurrio un error al buscar al usuario"
            };
        }

    }

    async getUsuarios(){
         const usuariosEncontrado = await this.userRepositoryI.getUsuarios();

        if (usuariosEncontrado) {
            return {
                ok: true,
                usuario: usuariosEncontrado
            };
        }else{
            return {
                ok: false, 
                mensaje:"Ocurrio un error al buscar a los usuarios"
            };
        }
    }
}