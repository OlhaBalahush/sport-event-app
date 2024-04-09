-- +migrate Up
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  receiver_id UUID REFERENCES users(id),
  data TEXT,
  status TEXT, -- unread / read
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
