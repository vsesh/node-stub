CREATE TABLE IF NOT EXISTS
    pages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        text TEXT NOT NULL
    );

CREATE UNIQUE INDEX IF NOT EXISTS
    pages_name_key_lower
ON
    pages (LOWER(name));

INSERT INTO
    pages (name, text)
VALUES
    ('key1', 'test 1'),
    ('key2', 'test 2');
