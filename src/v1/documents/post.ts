import {Request, Response} from 'express';
import * as asyncHandler from 'express-async-handler';

import copyDocumentToS3 from '../../lib/copy-document-to-s3';
import {sendMails} from '../../lib/sender';

import {createDBDocument, readDBDocument} from './db';

export default asyncHandler(
    async (req: Request, res: Response) => {
        const {name, originUrl, recipients} = req.body;
        const isSigned = false;
        const emails: string[] = recipients as string[];

        const url = await copyDocumentToS3(originUrl);
        const entry = await createDBDocument({name, url, emails, isSigned});
        const id = entry.id;

        sendMails(emails, url);

        scheduleSignCheck(id);

        res.json({
            id: entry.id,
            name,
            url,
            recipients,
            isSigned
        });
    }
);

function scheduleSignCheck (id: number): void {
    setTimeout(async () => {
        const document = await readDBDocument(id);
        if (!document.isSigned) {
            sendMails(document.emails, document.url);
        }
    }, 7 * 1000);
}
