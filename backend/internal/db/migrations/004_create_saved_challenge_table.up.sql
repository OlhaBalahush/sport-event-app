-- +migrate Up
CREATE TABLE IF NOT EXISTS saved_challenges (
  challenge_id UUID REFERENCES challenges(id),
  user_id UUID REFERENCES users(id),
  PRIMARY KEY (challenge_id, user_id)
);
