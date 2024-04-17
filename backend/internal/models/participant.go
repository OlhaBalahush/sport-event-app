package models

type Participant struct {
	UserID   string `db:"user_id" json:"userId"`
	Username string `db:"username" json:"username"`
	UserImg  string `db:"user_img" json:"userImg"`
	Points   int    `db:"points" json:"points"`
}
