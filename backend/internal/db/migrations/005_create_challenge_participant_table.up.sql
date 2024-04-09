-- +migrate Up
CREATE TABLE challenge_participant (
  challenge_id UUID REFERENCES challenges(id),
  user_id UUID REFERENCES users(id),
  points INTEGER,
  PRIMARY KEY (challenge_id, user_id)
);
