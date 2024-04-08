package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func ConnectDB() *sql.DB {
	connStr := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("olia"), os.Getenv("1a2s3d4f"), os.Getenv("sp_events_app_db"))

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("connected")
	return db
}

func MigrateUp() {
	databaseURL := "postgres://olia:1a2s3d4f@localhost:5432/sp_events_app_db?sslmode=disable"
	migrationsPath := "file:///home/olia/sport-event-app/backend/internal/db/migrations"

	m, err := migrate.New(migrationsPath, databaseURL)
	if err != nil {
		log.Fatal(err)
	}

	defer m.Close()

	// Apply all available migrations
	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatal(err)
	}

	log.Println("Migrations applied successfully")
}
