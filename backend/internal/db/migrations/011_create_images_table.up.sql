-- +migrate Up
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  img TEXT
);
