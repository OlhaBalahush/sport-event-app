package models

import (
	"database/sql"
	"time"
)

// Event represents event data
type Event struct {
	ID           string          `db:"id" json:"id"`
	Name         string          `db:"name" json:"name"`
	OrganizerID  string          `db:"organizer_id" json:"organizerId"`
	DateStart    time.Time       `db:"date_start" json:"dateStart"`
	DateEnd      time.Time       `db:"date_end" json:"dateEnd"`
	Location     string          `db:"location" json:"location"`
	Description  string          `db:"description" json:"description"`
	Requirements string          `db:"requirements" json:"requirements"`
	Preparation  string          `db:"preparation" json:"preparation"`
	Price        sql.NullFloat64 `db:"price" json:"price"`
	Attendees    int             `json:"attendees"`
	Imgs         []string        `db:"imgs" json:"imgs"`
	CreatedAt    time.Time       `db:"created_at" json:"createdAt"`
	Categories   []Category      `json:"categories"`
}
