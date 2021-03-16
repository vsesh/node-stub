import {Request, Response} from 'express';
import * as Boom from '@hapi/boom';
import * as asyncHandler from 'express-async-handler';

import {executeQuery} from '../../lib/db-client';

// TODO move to common types
interface Page {
    id: number;
    name: string;
    text: string;
}

export default asyncHandler(
    async (req: Request, res: Response) => {
        const page: string = req.params.page;

        const selectResult = await executeQuery<Page>({
            text: `
                SELECT
                    id,
                    name,
                    text
                FROM
                    pages
                WHERE
                    name = $1
                LIMIT 1`,
            values: [
                page
            ]
        });

        if (selectResult.rowCount === 0) {
            throw Boom.notFound();
        }

        const entry = selectResult.rows[0];

        res.json({
            id: entry.id,
            name: entry.name,
            page: entry.text
        });
    }
);
