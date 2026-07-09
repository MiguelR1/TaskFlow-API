import {prisma} from '../../config/prisma';
import bcrypt from 'bcrypt';
import { RegisterUserDto } from './auth.dto';

export class authRepository {

    async findByEmail(email: string) {
        return await prisma.user.findFirst({
            where: { email }
        });
    }

    async findByCedula(cedula: string) {
        return await prisma.user.findFirst({
            where: { cedula }
        });
    }

    async hashPassword(password: string){
        // saltRounds 10
        return await bcrypt.hash(password, 10);
    }

    async registerUser(userData: RegisterUserDto) {
        return await prisma.user.create({
            data: userData
        });
    }

}