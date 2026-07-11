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

    async login(
        {email, cedula, password}: {email: string, cedula: string, password: string}
    ){ 
        const usuarioByCedula = await authRepositoryI.findByCedula(cedula);

        const usuarioByEmail = await authRepositoryI.findByEmail(email);

        if( usuarioByCedula || usuarioByEmail ){

            const userLogeado = usuarioByCedula || usuarioByEmail;

            const passwordVerify = await authRepositoryI.comparePassword(password, userLogeado!.password!);

            if (passwordVerify) {
                    const getToken = await authMiddleware.crearToken(userLogeado!.id, userLogeado!.email);
                    return {ok:true, usuario: userLogeado, token: getToken};
            }else{
                return {ok:false, mensaje: "Usuario o contraseña incorrectos"};
            }

        }else{
            return {ok:false, mensaje: "Usuario o contraseña incorrectos 1"};
        }
       
    }

}