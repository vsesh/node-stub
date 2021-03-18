CREATE TABLE IF NOT EXISTS
    documents (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        recipients JSONB NOT NULL,
        is_signed BOOLEAN NOT NULL
    );
