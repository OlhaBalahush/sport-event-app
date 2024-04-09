-- +migrate Up
CREATE TABLE IF NOT EXISTS event_feedback (
  id SERIAL PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  user_id UUID REFERENCES users(id),
  comment TEXT,
  img TEXT,
  rate INTEGER,
  created_at TIMESTAMP
);
