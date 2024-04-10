package models

import "time"

// User represents user data
type User struct {
	ID        string
	Fullname  string
	Username  string
	Email     string
	Password  string
	Role      string
	Img       string
	Level     string
	CreatedAt time.Time
}