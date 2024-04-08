CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fullname TEXT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    img TEXT,
    level TEXT,
    created_at TIMESTAMP
);