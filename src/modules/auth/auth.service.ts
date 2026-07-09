import { authRepository } from '../auth/auth.repository';
import { RegisterUserDto } from './auth.dto';
import {authMiddleware} from '../../middlewares/authMiddleware';

const authRepositoryI = new authRepository();

export class authService{

    async registro(userData: RegisterUserDto) {

        const existeUsuario = await authRepositoryI.findByEmail(userData.email);

        if (existeUsuario) {
            return { ok: false, mensaje: "El correo ya está registrado" };
        }

        const existeCedula = await authRepositoryI.findByCedula(userData.cedula);

        if (existeCedula) {
            console.log("Cedula ya registrada:", userData.cedula);

            return { ok: false, mensaje: "La cédula ya está registrada" };
        }

        const contraseñaEncriptada = await authRepositoryI.hashPassword(userData.password);

        const nuevoUsuario = await authRepositoryI.registerUser({
            ...userData,
            password: contraseñaEncriptada
        });

        const nuevoToken = await authMiddleware.crearToken(nuevoUsuario.id, nuevoUsuario.email);

        return { ok: true, usuario: nuevoUsuario, token: nuevoToken };
    }

}