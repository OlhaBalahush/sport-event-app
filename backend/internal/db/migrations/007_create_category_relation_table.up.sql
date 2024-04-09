-- +migrate Up
CREATE TABLE IF NOT EXISTS category_relation (
  category_id INTEGER REFERENCES categories(id),
  event_id UUID REFERENCES events(id), --optional
  user_id UUID REFERENCES users(id), --optional
  challenge_id UUID REFERENCES challenges(id), --optional
  flag TEXT -- user / event / challenge
);
