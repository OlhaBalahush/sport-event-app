-- +migrate Up
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name VARCHAR(255),
  date_start TIMESTAMP WITH TIME ZONE,
  date_end TIMESTAMP WITH TIME ZONE,
  location VARCHAR(255),
  description TEXT,
  requirements TEXT,
  preparation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

