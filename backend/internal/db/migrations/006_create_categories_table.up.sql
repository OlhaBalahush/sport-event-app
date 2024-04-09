-- +migrate Up
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);
