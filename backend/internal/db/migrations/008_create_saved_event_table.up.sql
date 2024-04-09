-- +migrate Up
CREATE TABLE saved_event (
  user_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id),
  PRIMARY KEY (user_id, event_id)
);
