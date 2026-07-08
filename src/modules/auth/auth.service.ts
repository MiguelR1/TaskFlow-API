import { authRepository } from '../auth/auth.repository';

const authRepositoryI = new authRepository();

export class authService{

    async registro(userData: {nombre: string, email: string, password: string}) {

        const existeUsuario = await authRepositoryI.findByEmail(userData.nombre);

        if (existeUsuario) {
            throw new Error("User already exists");
        }

        // const contraseñaEncriptada = userData.password;

        // const nuevoUsuario = await authRepository.create({
        //     ...userData,
        //     password: contraseñaEncriptada
        // });

        // return nuevoUsuario;
    }

}