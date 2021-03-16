
import {Request, Response} from 'express';
import * as asyncHandler from 'express-async-handler';

import {executeQuery} from '../lib/db-client';

// example
export const pingMiddleware = asyncHandler(
    async (_req: Request, res: Response) => {
        await executeQuery('SELECT 1');
        res.send();
    }
);
