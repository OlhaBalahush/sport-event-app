-- +migrate Up
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name VARCHAR(255),
  organizer_id UUID REFERENCES users(id),
  date_start TIMESTAMP WITH TIME ZONE,
  date_end TIMESTAMP WITH TIME ZONE,
  location VARCHAR(255),
  description TEXT,
  requirements TEXT,
  preparation TEXT,
  price DECIMAL(10, 2),
  level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

