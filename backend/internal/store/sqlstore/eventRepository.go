package sqlstore

import (
	"log"
	"sport-event-app/backend/internal/models"
)

type EventRepository struct {
	store *Store
}

// Create implements store.EventRepository.
func (er *EventRepository) Create(event *models.Event) (string, error) {
	var id string
	// Insert event data into the events table
	err := er.store.db.QueryRow("INSERT INTO events (event_name, organizer_id, date_start, date_end, location, description, requirements, preparation, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
		event.Name, event.OrganizerID, event.DateStart, event.DateEnd, event.Location, event.Description, event.Requirements, event.Preparation, event.Price).Scan(&id)
	if err != nil {
		log.Println("Failed to create event:", err)
		return "", err
	}

	// Insert image URLs into the images table
	for _, img := range event.Imgs {
		_, err := er.store.db.Exec("INSERT INTO images (event_id, img) VALUES ($1, $2)", id, img)
		if err != nil {
			log.Println("Failed to insert image URL:", err)
			return "", err
		}
	}

	// Insert categories category_relation table
	for _, category := range event.Categories {
		_, err := er.store.db.Exec("INSERT INTO category_relation (category_id, event_id, flag) VALUES ($1, $2, 'event')", category.ID, id)
		if err != nil {
			log.Println("Failed to insert image URL:", err)
			return "", err
		}
	}

	return id, nil
}

// Delete implements store.EventRepository.
func (er *EventRepository) Delete(id string) error {
	// Delete images for the event
	if err := er.DeleteImagesByEventID(id); err != nil {
		log.Println("Failed to delete images for event:", err)
		return err
	}

	// Delete the event
	_, err := er.store.db.Exec("DELETE FROM events WHERE id=$1", id)
	if err != nil {
		log.Println("Failed to delete event:", err)
		return err
	}
	return nil
}

// GetAllEvents retrieves all events from the database
func (er *EventRepository) Read() ([]*models.Event, error) {
	query := `
        SELECT 
            e.id, e.event_name, e.organizer_id, e.date_start, e.date_end, e.location, e.description, e.requirements, e.preparation, e.price, e.created_at,
            COUNT(ep.event_id) AS num_attendees
        FROM 
            events e
        LEFT JOIN 
            event_participant ep ON e.id = ep.event_id
        GROUP BY 
            e.id, e.event_name, e.organizer_id, e.date_start, e.date_end, e.location, e.description, e.requirements, e.preparation, e.price, e.created_at
    `

	rows, err := er.store.db.Query(query)
	if err != nil {
		log.Println("Failed to get all events:", err)
		return nil, err
	}
	defer rows.Close()

	var events []*models.Event
	for rows.Next() {
		event := &models.Event{}
		err := rows.Scan(&event.ID, &event.Name, &event.OrganizerID, &event.DateStart, &event.DateEnd, &event.Location, &event.Description, &event.Requirements, &event.Preparation, &event.Price, &event.CreatedAt, &event.Attendees)
		if err != nil {
			log.Println("Failed to scan event row:", err)
			return nil, err
		}

		// Fetch images for the event
		images, err := er.GetImagesByEventID(event.ID)
		if err != nil {
			log.Println("Failed to get images for event:", err)
			return nil, err
		}
		event.Imgs = images

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
	_, err := er.store.db.Exec("UPDATE events SET event_name=$1, organizer_id=$2, date_start=$3, date_end=$4, location=$5, description=$6, requirements=$7, preparation=$8, price=$9, WHERE id=$10",
		event.Name, event.OrganizerID, event.DateStart, event.DateEnd, event.Location, event.Description, event.Requirements, event.Preparation, event.Price, event.ID)
	if err != nil {
		log.Println("Failed to update event:", err)
		return err
	}
	return nil
}

// GetEventByID retrieves an event from the database by ID
func (er *EventRepository) FindByID(id string) (*models.Event, error) {
	row := er.store.db.QueryRow("SELECT id, event_name, organizer_id, date_start, date_end, location, description, requirements, preparation, price, created_at FROM events WHERE id = $1", id)
	event := &models.Event{}
	err := row.Scan(&event.ID, &event.Name, &event.OrganizerID, &event.DateStart, &event.DateEnd, &event.Location, &event.Description, &event.Requirements, &event.Preparation, &event.Price, &event.CreatedAt)
	if err != nil {
		log.Println("Failed to get event by ID:", err)
		return nil, err
	}

	// Fetch images for the event
	images, err := er.GetImagesByEventID(event.ID)
	if err != nil {
		log.Println("Failed to get images for event:", err)
		return nil, err
	}
	event.Imgs = images

	return event, nil
}

// GetEventsByCategoryName gets all events what has category with categoryName
func (er *EventRepository) GetByCategoryName(categoryName string) ([]*models.Event, error) {
	// Prepare the SQL query
	query := `
        SELECT e.id, e.event_name, e.organizer_id, e.date_start, e.date_end, e.location, e.description, e.requirements, e.preparation, e.price, e.created_at
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
		if err := rows.Scan(&event.ID, &event.Name, &event.OrganizerID, &event.DateStart, &event.DateEnd, &event.Location, &event.Description, &event.Requirements, &event.Preparation, &event.Price, &event.CreatedAt); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		// Fetch images for the event
		images, err := er.GetImagesByEventID(event.ID)
		if err != nil {
			log.Println("Failed to get images for event:", err)
			return nil, err
		}
		event.Imgs = images

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
        SELECT e.id, e.event_name, e.organizer_id, e.date_start, e.date_end, e.location, e.description, e.requirements, e.preparation, e.price, e.created_at
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
		if err := rows.Scan(&event.ID, &event.Name, &event.OrganizerID, &event.DateStart, &event.DateEnd, &event.Location, &event.Description, &event.Requirements, &event.Preparation, &event.Price, &event.CreatedAt); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		// Fetch images for the event
		images, err := er.GetImagesByEventID(event.ID)
		if err != nil {
			log.Println("Failed to get images for event:", err)
			return nil, err
		}
		event.Imgs = images

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
        SELECT e.id, e.event_name, e.organizer_id, e.date_start, e.date_end, e.location, e.description, e.requirements, e.preparation, e.price, e.created_at
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
		if err := rows.Scan(&event.ID, &event.Name, &event.OrganizerID, &event.DateStart, &event.DateEnd, &event.Location, &event.Description, &event.Requirements, &event.Preparation, &event.Price, &event.CreatedAt); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		// Fetch images for the event
		images, err := er.GetImagesByEventID(event.ID)
		if err != nil {
			log.Println("Failed to get images for event:", err)
			return nil, err
		}
		event.Imgs = images
		events = append(events, event)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return events, nil
}

func (er *EventRepository) GetImagesByEventID(eventID string) ([]string, error) {
	rows, err := er.store.db.Query("SELECT img FROM images WHERE event_id = $1", eventID)
	if err != nil {
		log.Println("Failed to get images for event:", err)
		return nil, err
	}
	defer rows.Close()

	var images []string
	for rows.Next() {
		var img string
		if err := rows.Scan(&img); err != nil {
			log.Println("Failed to scan image row:", err)
			return nil, err
		}
		images = append(images, img)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over image rows:", err)
		return nil, err
	}

	return images, nil
}

// DeleteImagesByEventID deletes images for an event by its ID
func (er *EventRepository) DeleteImagesByEventID(eventID string) error {
	_, err := er.store.db.Exec("DELETE FROM images WHERE event_id = $1", eventID)
	if err != nil {
		log.Println("Failed to delete images for event:", err)
		return err
	}
	return nil
}

func (er *EventRepository) Save(eventID string, userID string) error {
	// Check if the event is already saved
	exists, err := er.IsSaved(eventID, userID)
	if err != nil {
		log.Println("Failed to check if event is saved:", err)
		return err
	}

	// If the event is already saved, remove it before inserting
	if exists {
		err := er.RemoveSavedEvent(eventID, userID)
		if err != nil {
			log.Println("Failed to remove existing saved event:", err)
			return err
		}
		return nil
	}

	// Prepare the SQL query for insertion
	query := `
        INSERT INTO saved_event (user_id, event_id)
        VALUES ($1, $2)
    `

	// Execute the query to save the event
	_, err = er.store.db.Exec(query, userID, eventID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return err
	}

	return nil
}

func (er *EventRepository) IsSaved(eventID string, userID string) (bool, error) {
	// Query the saved_event table to check if the user is a participant of the event
	query := `SELECT EXISTS(SELECT 1 FROM saved_event WHERE user_id = $1 AND event_id = $2)`
	var exists bool
	err := er.store.db.QueryRow(query, userID, eventID).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}

func (er *EventRepository) RemoveSavedEvent(eventID string, userID string) error {
	// Prepare the SQL query for deletion
	query := `
        DELETE FROM saved_event
        WHERE user_id = $1 AND event_id = $2
    `

	// Execute the query to remove the saved event
	_, err := er.store.db.Exec(query, userID, eventID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return err
	}

	return nil
}
