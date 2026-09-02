import * as express from 'express';
import { boolean } from 'zod';
import { UserWithoutPassword } from '../modules/users/user.dto';

declare global{
    namespace Express{
        interface Request {
            usuario: UserWithoutPassword,
            esAdmin?: boolean;
        }
    }
}