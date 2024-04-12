package sqlstore

import (
	"log"
	"sport-event-app/backend/internal/models"
)

type FeedbackRepository struct {
	store *Store
}

// Create creates a new event feedback record
func (fr *FeedbackRepository) Create(feedback *models.EventFeedback) (int, error) {
	// Prepare the SQL query
    query := `
        INSERT INTO event_feedback (event_id, user_id, comment, img, rate, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `

    // Execute the query
    var id int
    err := fr.store.db.QueryRow(query, feedback.EventID, feedback.UserID, feedback.Comment, feedback.Img, feedback.Rate, feedback.CreatedAt).Scan(&id)
    if err != nil {
        log.Println("Failed to execute query:", err)
        return 0, err
    }

    return id, nil
}

// Delete deletes an event feedback record by ID
func (fr *FeedbackRepository) Delete(id string) error {
	 // Prepare the SQL query
	 query := `
	 DELETE FROM event_feedback
	 WHERE id = $1
 `

 // Execute the query
 _, err := fr.store.db.Exec(query, id)
 if err != nil {
	 log.Println("Failed to execute query:", err)
	 return err
 }

 return nil
}

// Read retrieves all event feedback entities by event ID
func (fr *FeedbackRepository) Read(eventID string) ([]*models.EventFeedback, error) {
	// Prepare the SQL query
    query := `
        SELECT id, event_id, user_id, comment, img, rate, created_at
        FROM event_feedback
        WHERE event_id = $1
    `

    // Execute the query
    rows, err := fr.store.db.Query(query, eventID)
    if err != nil {
        log.Println("Failed to execute query:", err)
        return nil, err
    }
    defer rows.Close()

    // Iterate over the rows and collect event feedback entities
    var eventFeedbacks []*models.EventFeedback
    for rows.Next() {
        feedback := &models.EventFeedback{}
        if err := rows.Scan(&feedback.ID, &feedback.EventID, &feedback.UserID, &feedback.Comment, &feedback.Img, &feedback.Rate, &feedback.CreatedAt); err != nil {
            log.Println("Failed to scan row:", err)
            return nil, err
        }
        eventFeedbacks = append(eventFeedbacks, feedback)
    }
    if err := rows.Err(); err != nil {
        log.Println("Error iterating over rows:", err)
        return nil, err
    }

    return eventFeedbacks, nil
}

// Update updates an existing event feedback record
func (fr *FeedbackRepository) Update(feedback *models.EventFeedback) error {
	// Prepare the SQL query
    query := `
        UPDATE event_feedback
        SET event_id = $2, user_id = $3, comment = $4, img = $5, rate = $6, created_at = $7
        WHERE id = $1
    `

    // Execute the query
    _, err := fr.store.db.Exec(query, feedback.ID, feedback.EventID, feedback.UserID, feedback.Comment, feedback.Img, feedback.Rate, feedback.CreatedAt)
    if err != nil {
        log.Println("Failed to execute query:", err)
        return err
    }

    return nil
}
