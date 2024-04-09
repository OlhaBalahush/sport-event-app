-- +migrate Up
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_name VARCHAR(255),
  organization_name TEXT,
  organization_link TEXT,
  img TEXT,
  deadline TIMESTAMP WITH TIME ZONE,
  aim TEXT,
  award TEXT,
  overview TEXT,
  details_rules TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
