package sqlstore

import (
	"log"
	"sport-event-app/backend/internal/models"
)

type RequestRepository struct {
	store *Store
}

// Create creates a new request record
func (rr *RequestRepository) Create(request *models.Request) (int, error) {
	// Prepare the SQL query
	query := `
        INSERT INTO requests (user_id, comment, file)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `

	// Execute the query
	var requestID int
	err := rr.store.db.QueryRow(query, request.UserID, request.Comment, request.File).Scan(&requestID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return 0, err
	}

	return requestID, nil
}

// Delete deletes a request record by ID
func (rr *RequestRepository) Delete(id string) error {
	// Prepare the SQL query
    query := `
        DELETE FROM requests
        WHERE id = $1
    `

    // Execute the query
    _, err := rr.store.db.Exec(query, id)
    if err != nil {
        log.Println("Failed to execute query:", err)
        return err
    }

    return nil
}

// Read retrieves all requests
func (rr *RequestRepository) Read() ([]*models.Request, error) {
	    // Prepare the SQL query
		query := `
        SELECT id, user_id, comment, file, created_at
        FROM requests
    `

    // Execute the query
    rows, err := rr.store.db.Query(query)
    if err != nil {
        log.Println("Failed to execute query:", err)
        return nil, err
    }
    defer rows.Close()

    // Iterate over the rows and collect requests
    var requests []*models.Request
    for rows.Next() {
        request := &models.Request{}
        if err := rows.Scan(&request.ID, &request.UserID, &request.Comment, &request.File, &request.CreatedAt); err != nil {
            log.Println("Failed to scan row:", err)
            return nil, err
        }
        requests = append(requests, request)
    }
    if err := rows.Err(); err != nil {
        log.Println("Error iterating over rows:", err)
        return nil, err
    }

    return requests, nil
}

// Update updates an existing request record
func (rr *RequestRepository) Update(request *models.Request) error {
	// Prepare the SQL query
    query := `
        UPDATE requests
        SET user_id = $2, comment = $3, file = $4
        WHERE id = $1
    `

    // Execute the query
    _, err := rr.store.db.Exec(query, request.ID, request.UserID, request.Comment, request.File)
    if err != nil {
        log.Println("Failed to execute query:", err)
        return err
    }

    return nil
}
