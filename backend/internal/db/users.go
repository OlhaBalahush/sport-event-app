package db

import (
	"database/sql"
	"log"
	"example.com/sport-event-app/backend/internal/db/models"
)

// UserRepository provides methods for user-related database operations
type UserRepository struct {
	db *sql.DB
}

// NewUserRepository creates a new UserRepository instance
func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

// CreateUser inserts a new user into the database
func (ur *UserRepository) CreateUser(user *models.User) error {
	_, err := ur.db.Exec("INSERT INTO users (fullname, username, email, password, role, img, level) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		user.Fullname, user.Username, user.Email, user.Password, user.Role, user.Img, user.Level)
	if err != nil {
		log.Println("Failed to create user:", err)
		return err
	}
	return nil
}

// GetUserByID retrieves a user from the database by ID
func (ur *UserRepository) GetUserByID(id string) (*models.User, error) {
	row := ur.db.QueryRow("SELECT id, fullname, username, email, role, img, level FROM users WHERE id = $1", id)
	user := &models.User{}
	err := row.Scan(&user.ID, &user.Fullname, &user.Username, &user.Email, &user.Role, &user.Img, &user.Level)
	if err != nil {
		log.Println("Failed to get user by ID:", err)
		return nil, err
	}
	return user, nil
}

// GetAllUsers retrieves all users from the database
func (ur *UserRepository) GetAllUsers() ([]*models.User, error) {
	rows, err := ur.db.Query("SELECT id, fullname, username, email, role, img, level, created_at FROM users")
	if err != nil {
		log.Println("Failed to get all users:", err)
		return nil, err
	}
	defer rows.Close()

	var users []*models.User
	for rows.Next() {
		user := &models.User{}
		err := rows.Scan(&user.ID, &user.Fullname, &user.Username, &user.Email, &user.Role, &user.Img, &user.Level, &user.CreatedAt)
		if err != nil {
			log.Println("Failed to scan user row:", err)
			return nil, err
		}
		users = append(users, user)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over user rows:", err)
		return nil, err
	}

	return users, nil
}

// UpdateUser updates an existing user in the database
func (ur *UserRepository) UpdateUser(user *models.User) error {
	_, err := ur.db.Exec("UPDATE users SET fullname=$1, username=$2, email=$3, password=$4, role=$5, img=$6, level=$7 WHERE id=$8",
		user.Fullname, user.Username, user.Email, user.Password, user.Role, user.Img, user.Level, user.ID)
	if err != nil {
		log.Println("Failed to update user:", err)
		return err
	}
	return nil
}

// DeleteUser deletes an existing user from the database
func (ur *UserRepository) DeleteUser(id string) error {
	_, err := ur.db.Exec("DELETE FROM users WHERE id=$1", id)
	if err != nil {
		log.Println("Failed to delete user:", err)
		return err
	}
	return nil
}
