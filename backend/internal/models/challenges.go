package models

import (
	"database/sql"
	"time"
)

// Challenge represents challenge data
type Challenge struct {
	ID               string         `db:"id" json:"id"`
	Name             string         `db:"name" json:"name"`
	OrganizationName string         `db:"organization_name" json:"organizationName"`
	OrganizationLink string         `db:"organization_link" json:"organizationLink"`
	Img              sql.NullString `db:"img" json:"img"`
	Deadline         time.Time      `db:"deadline" json:"deadline"`
	Aim              string         `db:"aim" json:"aim"`
	Award            string         `db:"award" json:"award"`
	Overview         string         `db:"overview" json:"overview"`
	DetailsRules     string         `db:"details_rules" json:"detailsRules"`
	CreatedAt        time.Time      `db:"created_at" json:"createdAt"`
	Points           int            `db:"points" json:"points"` // for participants
	Categories       []Category     `json:"categories"`         // for create
}
