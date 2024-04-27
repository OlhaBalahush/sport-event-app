package models

import "time"

// Request represents a user request
type Request struct {
	ID        int       `db:"id" json:"id"`
	UserID    string    `db:"user_id" json:"userId"`
	Comment   string    `db:"comment" json:"comment"`
	File      string    `db:"file" json:"file"` // TODO array
	CreatedAt time.Time `db:"created_at" json:"createdAt"`
}
