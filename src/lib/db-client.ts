import * as pg from 'pg';

import {dbSettings} from '../config';

declare type ClientCallback<T> = (client: pg.PoolClient) => Promise<T>;
declare type ClientValue = string | pg.QueryConfig;
declare type ClientResult<T> = pg.QueryResult<T>;

interface ExecuteResult<T> {
    data: T;
    connectionTime: number;
    executeTime: number;
}

const pool: pg.Pool = new pg.Pool(dbSettings);

async function execute<T> (callback: ClientCallback<T>): Promise<ExecuteResult<T>> {
    let client;
    let data;

    let time = Date.now();
    let connectionTime = Infinity;
    let executeTime = Infinity;

    try {
        client = await pool.connect();
        connectionTime = Date.now() - time;
        time = Date.now();
        data = await callback(client);
        executeTime = Date.now() - time;
    } finally {
        if (client) {
            client.release();
        }
    }

    return {
        data,
        connectionTime,
        executeTime
    };
}

export async function executeQuery<T> (query: ClientValue): Promise<ClientResult<T>> {
    const result = await execute<ClientResult<T>>(
        async (client: pg.PoolClient) => client.query(query)
    );

    return result.data;
}

export async function executeReadCallback<T> (callback: ClientCallback<T>): Promise<void> {
    await execute<T>(
        async (client: pg.PoolClient) => callback(client)
    );
}

export async function executeModifyCallback<T> (callback: ClientCallback<T>): Promise<void> {
    await execute<T>(
        async (client: pg.PoolClient) => {
            let result;
            try {
                await client.query('BEGIN');
                result = await callback(client);
                await client.query('COMMIT');
            } catch (error) {
                await client.query('ROLLBACK');
                throw error;
            }

            return result;
        }
    );
}
