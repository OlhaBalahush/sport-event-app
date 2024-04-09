-- +migrate Up
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fullname VARCHAR(255),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role TEXT,
    img TEXT,
    level TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);