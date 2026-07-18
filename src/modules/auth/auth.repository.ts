import {prisma} from '../../config/prisma';
import bcrypt from 'bcrypt';
import { registerUsuario } from '../users/user.dto';

export class authRepository {

    async hashPassword(password: string){
        // saltRounds 10
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password:string, passwordHash:string){
        return await bcrypt.compare(password, passwordHash);
    }
    
    async registerUser(userData: registerUsuario) {
        return await prisma.usuario.create({
            data: userData
        });
    }
    
    async loginUser(email: string, cedula:string) {
        
        return await prisma.usuario.findFirst({
            where: {
                OR: [ { email }, { cedula } ]
            }
        })
    }

}