package sqlstore

import (
	"log"
	"sport-event-app/backend/internal/models"
)

type EventRepository struct {
	store *Store
}

// Create implements store.EventRepository.
func (er *EventRepository) Create(event *models.Event) error {
	_, err := er.store.db.Exec("INSERT INTO events (event_name, organizer_id, date_start, date_end, location, description, requirements, preparation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
		event.Name, event.OrganizerID, event.DateStart, event.DateEnd, event.Location, event.Description, event.Requirements, event.Preparation)
	if err != nil {
		log.Println("Failed to create event:", err)
		return err
	}
	return nil
}

// Delete implements store.EventRepository.
func (er *EventRepository) Delete(id string) error {
	_, err := er.store.db.Exec("DELETE FROM events WHERE id=$1", id)
	if err != nil {
		log.Println("Failed to delete event:", err)
		return err
	}
	return nil
}

// GetAllEvents retrieves all events from the database
func (er *EventRepository) Read() ([]*models.Event, error) {
	rows, err := er.store.db.Query("SELECT id, event_name, organizer_id, date_start, date_end, location, description, requirements, preparation, created_at FROM events")
	if err != nil {
		log.Println("Failed to get all events:", err)
		return nil, err
	}
	defer rows.Close()

	var events []*models.Event
	for rows.Next() {
		event := &models.Event{}
		err := rows.Scan(&event.ID, &event.Name, &event.OrganizerID, &event.DateStart, &event.DateEnd, &event.Location, &event.Description, &event.Requirements, &event.Preparation, &event.CreatedAt)
		if err != nil {
			log.Println("Failed to scan event row:", err)
			return nil, err
		}
		events = append(events, event)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over event rows:", err)
		return nil, err
	}

	return events, nil
}

// UpdateEvent updates an existing event in the database
func (er *EventRepository) Update(event *models.Event) error {
	_, err := er.store.db.Exec("UPDATE events SET event_name=$1, organizer_id=$2, date_start=$3, date_end=$4, location=$5, description=$6, requirements=$7, preparation=$8 WHERE id=$9",
		event.Name, event.OrganizerID, event.DateStart, event.DateEnd, event.Location, event.Description, event.Requirements, event.Preparation, event.ID)
	if err != nil {
		log.Println("Failed to update event:", err)
		return err
	}
	return nil
}

// GetEventByID retrieves an event from the database by ID
func (er *EventRepository) FindByID(id string) (*models.Event, error) {
	row := er.store.db.QueryRow("SELECT id, event_name, organizer_id, date_start, date_end, location, description, requirements, preparation, created_at FROM events WHERE id = $1", id)
	event := &models.Event{}
	err := row.Scan(&event.ID, &event.Name, &event.OrganizerID, &event.DateStart, &event.DateEnd, &event.Location, &event.Description, &event.Requirements, &event.Preparation, &event.CreatedAt)
	if err != nil {
		log.Println("Failed to get event by ID:", err)
		return nil, err
	}
	return event, nil
}

// GetEventsByCategoryName gets all events what has category with categoryName
func (er *EventRepository) GetByCategoryName(categoryName string) ([]*models.Event, error) {
	// Prepare the SQL query
	query := `
        SELECT e.id, e.event_name, e.organizer_id, e.date_start, e.date_end, e.location, e.description, e.requirements, e.preparation, e.created_at
        FROM events e
        JOIN category_relation cr ON e.id = cr.event_id
        JOIN categories c ON cr.category_id = c.id
        WHERE c.name = $1
    `

	// Execute the query
	rows, err := er.store.db.Query(query, categoryName)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return nil, err
	}
	defer rows.Close()

	// Iterate over the rows and collect events
	var events []*models.Event
	for rows.Next() {
		event := &models.Event{}
		if err := rows.Scan(&event.ID, &event.Name, &event.OrganizerID, &event.DateStart, &event.DateEnd, &event.Location, &event.Description, &event.Requirements, &event.Preparation, &event.CreatedAt); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		events = append(events, event)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return events, nil
}

// GetSavedEventsForUser retrieves all saved events for a specific user
func (er *EventRepository) GetSavedEventsForUser(userID string) ([]*models.Event, error) {
	// Prepare the SQL query
	query := `
        SELECT e.id, e.event_name, e.organizer_id, e.date_start, e.date_end, e.location, e.description, e.requirements, e.preparation, e.created_at
        FROM events e
        JOIN saved_event se ON e.id = se.event_id
        WHERE se.user_id = $1
    `

	// Execute the query
	rows, err := er.store.db.Query(query, userID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return nil, err
	}
	defer rows.Close()

	// Iterate over the rows and collect saved events
	var events []*models.Event
	for rows.Next() {
		event := &models.Event{}
		if err := rows.Scan(&event.ID, &event.Name, &event.OrganizerID, &event.DateStart, &event.DateEnd, &event.Location, &event.Description, &event.Requirements, &event.Preparation, &event.CreatedAt); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		events = append(events, event)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return events, nil
}

// GetEventsParticipatedByUser retrieves all events where a user took part
func (er *EventRepository) GetEventsParticipatedByUser(userID string) ([]*models.Event, error) {
	// Prepare the SQL query
	query := `
        SELECT e.id, e.event_name, e.organizer_id, e.date_start, e.date_end, e.location, e.description, e.requirements, e.preparation, e.created_at
        FROM events e
        JOIN event_participant ep ON e.id = ep.event_id
        WHERE ep.user_id = $1
    `

	// Execute the query
	rows, err := er.store.db.Query(query, userID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return nil, err
	}
	defer rows.Close()

	// Iterate over the rows and collect participated events
	var events []*models.Event
	for rows.Next() {
		event := &models.Event{}
		if err := rows.Scan(&event.ID, &event.Name, &event.OrganizerID, &event.DateStart, &event.DateEnd, &event.Location, &event.Description, &event.Requirements, &event.Preparation, &event.CreatedAt); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		events = append(events, event)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return events, nil
}
