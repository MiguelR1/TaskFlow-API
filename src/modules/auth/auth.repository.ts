import {prisma} from '../../config/prisma';
import bcrypt from 'bcrypt';
import { RegisterUserDto } from './auth.dto';

export class authRepository {

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

    async hashPassword(password: string){
        // saltRounds 10
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password:string, passwordHash:string){
        return await bcrypt.compare(password, passwordHash);
    }
    
    async registerUser(userData: RegisterUserDto) {
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