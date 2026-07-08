import {prisma} from '../../config/prisma';

export class authRepository {

    async findByEmail(nombre: string) {
        return await prisma.user.findFirst({
            where: { nombre }
        });
    }
}