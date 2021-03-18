import {logger} from './logger';

export async function sendEmail (email: string, documentUrl: string): Promise<void> {
    const header = 'Here is you document!';
    const body = `You can sign it <a href='${documentUrl}' target=_blank>here</a>`;

    logger.info(
        [email, header, body].join('|')
    );
}

export function sendMails (emails: string[], documentUrl: string): void {
    emails.forEach(email => {
        sendEmail(email, documentUrl)
            .catch(logger.error);
    });
}
