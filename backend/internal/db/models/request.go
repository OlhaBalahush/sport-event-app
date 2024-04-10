package models

import "time"

// Request represents a user request
type Request struct {
	ID        int
	UserID    string
	Comment   string
	File      string
	CreatedAt time.Time
}
