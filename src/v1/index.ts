import {Router} from 'express';

import get from './page/get';
import proxy from './proxy';

const entryURL = '/:page([A-Za-z0-9-_]{1,255})';

const entriesRouter = Router()
    .get(entryURL, get);

export default Router()
    .use('/pages', entriesRouter)
    .get('/proxy', proxy);
