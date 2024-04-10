package db

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func ConnectDB() *sql.DB {
	connStr := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		"olia", "1a2s3d4f", "sp_events_app_db") // temporary solution TODO make it more secure

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
	if err := m.Up(); err != nil {
		if err != migrate.ErrNoChange {
			log.Fatalf("Migration failed: %v", err)
		} else {
			log.Println("No migrations to apply.")
		}
	} else {
		log.Println("Migrations up applied successfully")
	}
}

func MigrateDown() {
	databaseURL := "postgres://olia:1a2s3d4f@localhost:5432/sp_events_app_db?sslmode=disable"
	migrationsPath := "file:///home/olia/sport-event-app/backend/internal/db/migrations"

	m, err := migrate.New(migrationsPath, databaseURL)
	if err != nil {
		log.Fatal(err)
	}

	defer m.Close()

	// Apply all available migrations
	if err := m.Down(); err != nil && err != migrate.ErrNoChange {
		log.Fatal(err)
	}

	log.Println("Migrations down applied successfully")
}
