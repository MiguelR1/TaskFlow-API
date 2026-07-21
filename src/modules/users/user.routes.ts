import { Router } from 'express';
import { userController } from './user.controller';
import { checkAdmin } from '../../middlewares/role.Middleware';

const userRouter = Router();

const userControllerI = new userController();

userRouter.use(checkAdmin);

userRouter.put('/editUsuario/:idUsuario', userControllerI.editUsuario );

userRouter.delete('/deleteUsuario/:idUsuario', checkAdmin, userControllerI.deleteUsuario );

userRouter.get('/getUsuarioById/:idUsuario', userControllerI.getUsuarioById );

userRouter.get('/getUsuarios', userControllerI.getUsuarios );

export default userRouter;