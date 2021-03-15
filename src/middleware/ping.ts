
import {Request, Response} from 'express';
import * as asyncHandler from 'express-async-handler';

// example
export const pingMiddleware = asyncHandler(
    async (_req: Request, res: Response) => {
        res.send();
    }
);
