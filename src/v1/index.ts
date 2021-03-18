import {Router} from 'express';
import * as bodyParser from 'body-parser';

import post from './documents/post';
import proxy from './proxy';

const entriesRouter = Router()
    .post('/', [
        bodyParser.json(),
        post
    ]);

export default Router()
    .use('/documents', entriesRouter)
    .get('/proxy', proxy);
