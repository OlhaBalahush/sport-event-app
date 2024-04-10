package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

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

func (u *User) Sanitize() {
	u.Password = ""
}

func (u *User) ComparePassword(password string) bool {
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