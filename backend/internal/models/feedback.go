package models

import (
	"database/sql"
	"time"
)

// EventFeedback represents feedback data for an event
type EventFeedback struct {
	ID        int            `db:"id" json:"id"`
	EventID   string         `db:"event_id" json:"eventId"`
	UserID    string         `db:"user_id" json:"userId"`
	Comment   string         `db:"comment" json:"comment"`
	Img       sql.NullString `db:"img" json:"img"`
	Rate      int            `db:"rate" json:"rate"`
	CreatedAt time.Time      `db:"created_at" json:"createdAt"`
}
