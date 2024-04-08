package main

import (
	"example.com/sport-event-app/backend/internal/db"
)

func main() {
	dbConn := db.ConnectDB()
	defer dbConn.Close()

	db.MigrateUp()
}
