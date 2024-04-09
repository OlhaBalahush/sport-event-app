-- +migrate Up
CREATE TABLE saved_challenges (
  challenge_id UUID REFERENCES challenges(id),
  user_id UUID REFERENCES users(id),
  PRIMARY KEY (challenge_id, user_id)
);
