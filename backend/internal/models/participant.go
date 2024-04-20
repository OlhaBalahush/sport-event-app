package models

type Participant struct {
	UserID   string `db:"user_id" json:"id"`
	Username string `db:"username" json:"username"`
	UserImg  string `db:"user_img" json:"img"`
	Points   int    `db:"points" json:"points"`
}
