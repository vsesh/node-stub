import {executeQuery} from '../../lib/db-client';

interface CreateDocumentDBResult {
    id: number;
}

interface CreateDBDocumentParams {
    name: string;
    url: string;
    emails: string[];
    isSigned: boolean;
}

interface Document extends CreateDBDocumentParams {
    id: number;
}

export async function createDBDocument (params: CreateDBDocumentParams): Promise<CreateDocumentDBResult> {
    const selectResult = await executeQuery<CreateDocumentDBResult>({
        text: `
            INSERT INTO
                documents (name, url, recipients, is_signed)
            VALUES
                ($1, $2, $3, $4)
            RETURNING id;
        `,
        values: [
            params.name,
            params.url,
            JSON.stringify(params.emails),
            params.isSigned
        ]
    });

    return selectResult.rows[0];
}

export async function readDBDocument (id: number): Promise<Document> {
    const query = {
        text: `
            SELECT
                id, name, url, recipients, is_signed
            FROM
                documents
            WHERE id = $1;
        `,
        values: [
            id
        ]
    };
    const selectResult = await executeQuery<any>(query);
    if (selectResult.rows.length === 0) {
        throw new Error('Not found');
    }

    const result = selectResult.rows[0];

    return {
        id: result.id,
        name: result.name,
        url: result.url,
        emails: result.recipients,
        isSigned: result.is_signed
    };
}
