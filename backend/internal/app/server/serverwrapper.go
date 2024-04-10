package server

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"sport-event-app/backend/internal/store/sqlstore"
	"sport-event-app/backend/pkg/router"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

func Start(config *Config) error {
	db, err := ConnectDB()
	if err != nil {
		return err
	}

	MigrateUp()

	defer db.Close()

	store := sqlstore.New(db)

	//create CORS middleware
	corsMiddleware := cors.New(cors.Options{
		AllowOriginRequestFunc: func(r *http.Request, origin string) bool {
			return true
		},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Content-Type", "Content-Length", "Authorization"},
		AllowCredentials: true,
	})

	//create router
	router := router.NewRouter()

	//new http.server with corsmiddleware
	newHttpSrv := &http.Server{
		Addr:    ":7080",
		Handler: corsMiddleware.Handler(router),
	}
	srv := newServer(store, newHttpSrv, router)

	return srv.Server.ListenAndServe()
}

func ConnectDB() (*sql.DB, error) {
	connStr := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		"olia", "1a2s3d4f", "sp_events_app_db") // temporary solution TODO make it more secure

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return db, nil
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
