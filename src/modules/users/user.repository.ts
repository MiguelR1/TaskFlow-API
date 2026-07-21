import { prisma } from '../../config/prisma';
import { registerUsuario } from './user.dto';

export class userRepository{

    async editUsuario(idUsuario: number, dataUser: registerUsuario){
        return await prisma.usuario.update({
            where: {
                id: idUsuario
            },
            data: dataUser
        })
    }

    async deleteUsuario( idUsuario:number ){
        return await prisma.usuario.delete({
            where: {id: idUsuario}
        })
    }

    async getUsuarioById(idUsuario:number){
        return prisma.usuario.findUnique({
            where: {id: Number(idUsuario)}
        });
    }

    async getUsuarios(){
        return prisma.usuario.findMany();
    }

    //Funciones secundarias

    async findByEmail(email: string) {
        return await prisma.usuario.findFirst({
            where: { email }
        });
    }

    async findByCedula(cedula: string) {
        return await prisma.usuario.findFirst({
            where: { cedula }
        });
    }

}