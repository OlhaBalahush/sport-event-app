package models

import (
	"database/sql"
	"time"
)

// Challenge represents challenge data
type Challenge struct {
	ID               string
	Name             string
	OrganizationName string
	OrganizationLink string
	Img              sql.NullString
	Deadline         time.Time
	Aim              string
	Award            string
	Overview         string
	DetailsRules     string
	CreatedAt        time.Time
	Points           int		// for participants
}