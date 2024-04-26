package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

// User represents user data
type User struct {
	ID         string     `db:"id" json:"id"`
	Fullname   string     `db:"fullname" json:"fullname"`
	Username   string     `db:"username" json:"username"`
	Email      string     `db:"email" json:"email"`
	Password   string     `db:"password" json:"password"`
	Role       string     `db:"role" json:"role"`
	Img        string     `db:"img" json:"img"`
	Level      string     `db:"level" json:"level"`
	CreatedAt  time.Time  `db:"created_at" json:"createdAt"`
	Categories []Category `json:"categories"`
}

func (u *User) Sanitize() {
	u.Password = ""
}

func (u *User) ComparePassword(password string) bool {
	println([]byte(u.Password))
	println(password)
	return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)) == nil
}

func encryptString(str string) (string, error) {
	b, err := bcrypt.GenerateFromPassword([]byte(str), bcrypt.MinCost)
	if err != nil {
		return "", err
	}

	return string(b), nil
}

func (u *User) BeforeCreate() error {
	if len(u.Password) > 0 {
		enc, err := encryptString(u.Password)
		if err != nil {
			return err
		}
		u.Password = enc
	}

	return nil
}
