package models

import "time"

// Event represents event data
type Event struct {
	ID           string    `db:"id" json:"id"`
	Name         string    `db:"name" json:"name"`
	OrganizerID  string    `db:"organizer_id" json:"organizerId"`
	DateStart    time.Time `db:"date_start" json:"dateStart"`
	DateEnd      time.Time `db:"date_end" json:"dateEnd"`
	Location     string    `db:"location" json:"location"`
	Description  string    `db:"description" json:"description"`
	Requirements string    `db:"requirements" json:"requirements"`
	Preparation  string    `db:"preparation" json:"preparation"`
	Imgs         []string  `db:"imgs" json:"imgs"`
	CreatedAt    time.Time `db:"created_at" json:"createdAt"`
}
