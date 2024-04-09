-- +migrate Up
CREATE TABLE IF NOT EXISTS challenge_participant (
  challenge_id UUID REFERENCES challenges(id),
  user_id UUID REFERENCES users(id),
  points INTEGER,
  PRIMARY KEY (challenge_id, user_id)
);
