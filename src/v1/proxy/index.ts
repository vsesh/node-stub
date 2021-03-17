import {Request, Response} from 'express';
import fetch from 'node-fetch';

// import * as Boom from '@hapi/boom';
import * as asyncHandler from 'express-async-handler';

export default asyncHandler(
    async (_req: Request, res: Response) => {
        /*
            const response = await fetch('https://api.github.com/users/vsesh');
            const json = await response.json()
            res.send(json);
        */
        const response = await fetch('https://api.github.com/users/vsesh');
        res.contentType('application/json');
        response.body.pipe(res);
    }
);
