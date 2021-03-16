import * as express from 'express';
import {Request, Response, NextFunction} from 'express';
import * as Boom from '@hapi/boom';

import {logger} from './lib/logger';
import {pingMiddleware} from './middleware/ping';

import v1Router from './v1';

const port: string = process.env.PORT || '8080';

export const app = express()
    .disable('x-powered-by')
    .get('/ping', pingMiddleware)
    .use('/v1', v1Router)
    .use((_req: Request, _res: Response, next: NextFunction) =>
        next(Boom.notFound('Endpoint not found')))
    .use((err: Error, _req: Request, res: Response, _next?: NextFunction) => {
        if (Boom.isBoom(err)) {
            sendError(res, err);
        } else {
            logger.error(err.stack || err.toString());
            sendError(res, Boom.internal());
        }
    });

app.listen(port, () => {
    logger.info(`Application started on port ${port}`);
});

function sendError (res: Response, err: Boom.Boom): void {
    res.status(err.output.statusCode).json(err.output.payload);
}
