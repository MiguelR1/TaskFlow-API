import { authRepository } from '../auth/auth.repository';
import {authMiddleware} from '../../middlewares/authMiddleware';
import { loginUsuario, registerUsuario } from '../users/user.dto';


export class authService{
    
    authRepositoryI = new authRepository();
    
    async registro(userData: registerUsuario) {

        const existeUsuario = await this.authRepositoryI.findByEmail(userData.email);

        if (existeUsuario) {
            return { ok: false, mensaje: "El correo ya está registrado" };
        }

        const existeCedula = await this.authRepositoryI.findByCedula(userData.cedula);

        if (existeCedula) {
            console.log("Cedula ya registrada:", userData.cedula);

            return { ok: false, mensaje: "La cédula ya está registrada" };
        }

        const contraseñaEncriptada = await this.authRepositoryI.hashPassword(userData.password);

        const nuevoUsuario = await this.authRepositoryI.registerUser({
            ...userData,
            password: contraseñaEncriptada
        });

        const nuevoToken = await authMiddleware.crearToken(nuevoUsuario.id, nuevoUsuario.email);

        return { ok: true, usuario: nuevoUsuario, token: nuevoToken };
    }

    async login(userData: loginUsuario){ 

        const usuarioByCedula = userData.cedula ? await this.authRepositoryI.findByCedula(userData.cedula) : undefined;

        const usuarioByEmail = userData.email ? await this.authRepositoryI.findByEmail(userData.email) : undefined;

        if( usuarioByCedula || usuarioByEmail ){

            const userLogeado = usuarioByCedula || usuarioByEmail;

            const passwordVerify = await this.authRepositoryI.comparePassword(userData.password, userLogeado!.password!);

            if (passwordVerify) {
                    const getToken = await authMiddleware.crearToken(userLogeado!.id, userLogeado!.email);
                    return {ok:true, usuario: userLogeado, token: getToken};
            }else{
                return {ok:false, mensaje: "Usuario o contraseña incorrectos"};
            }

        }else{
            return {ok:false, mensaje: "Usuario o contraseña incorrectos"};
        }
       
    }

}