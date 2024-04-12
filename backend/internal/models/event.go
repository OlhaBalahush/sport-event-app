package models

import "time"

// Event represents event data
type Event struct {
	ID           string
	Name         string
	OrganizerID  string
	DateStart    time.Time
	DateEnd      time.Time
	Location     string
	Description  string
	Requirements string
	Preparation  string
	Imgs         []string
	CreatedAt    time.Time
}
