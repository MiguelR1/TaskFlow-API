import { Router } from 'express';
import { userController } from './user.controller';
import { checkAdmin } from '../../middlewares/role.Middleware';
import { authMiddleware } from '../../middlewares/authMiddleware';

const userRouter = Router();

const userControllerI = new userController();

const insAuthMiddleware = new authMiddleware();
userRouter.use(insAuthMiddleware.userAuthMiddleware);
userRouter.use(checkAdmin);

userRouter.put('/editUsuario/:idUsuario', userControllerI.editUsuario );

userRouter.delete('/deleteUsuario/:idUsuario', userControllerI.deleteUsuario );

userRouter.get('/getUsuarioById/:idUsuario', userControllerI.getUsuarioById );

userRouter.get('/getUsuarios', userControllerI.getUsuarios );

export default userRouter;