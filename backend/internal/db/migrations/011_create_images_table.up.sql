-- +migrate Up
CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  img TEXT
);
