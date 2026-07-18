import * as express from 'express';
import { boolean } from 'zod';

declare global{
    namespace Express{
        interface Request {
            esAdmin?: boolean;
        }
    }
}