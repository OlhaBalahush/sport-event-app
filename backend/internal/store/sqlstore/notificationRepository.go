package sqlstore

import (
	"log"
	"sport-event-app/backend/internal/models"
)

type NotificationRepository struct {
	store *Store
}

// Create implements store.NotificationRepository.
func (nr *NotificationRepository) Create(notification *models.Notification) (int, error) {
	query := `
        INSERT INTO notifications (receiver_id, data, status)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `

	// Execute the query
	var id int
	err := nr.store.db.QueryRow(query, notification.ReceiverID, notification.Data, notification.Status).Scan(&id)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return 0, err
	}

	return id, nil
}

// Delete deletes a notification record by ID
func (nr *NotificationRepository) Delete(id string) error {
	// Prepare the SQL query
    query := `
        DELETE FROM notifications
        WHERE id = $1
    `

    // Execute the query
    _, err := nr.store.db.Exec(query, id)
    if err != nil {
        log.Println("Failed to execute query:", err)
        return err
    }

    return nil
}

// Read retrieves all notifications for a user by their ID
func (nr *NotificationRepository) Read(userID string) ([]*models.Notification, error) {
	// Prepare the SQL query
    query := `
        SELECT id, receiver_id, data, status, created_at
        FROM notifications
        WHERE receiver_id = $1
    `

    // Execute the query
    rows, err := nr.store.db.Query(query, userID)
    if err != nil {
        log.Println("Failed to execute query:", err)
        return nil, err
    }
    defer rows.Close()

    // Iterate over the rows and collect notifications
    var notifications []*models.Notification
    for rows.Next() {
        notification := &models.Notification{}
		// TODO check Data
        if err := rows.Scan(&notification.ID, &notification.ReceiverID, &notification.Data, &notification.Status, &notification.Timestamp); err != nil {
            log.Println("Failed to scan row:", err)
            return nil, err
        }
        notifications = append(notifications, notification)
    }
    if err := rows.Err(); err != nil {
        log.Println("Error iterating over rows:", err)
        return nil, err
    }

    return notifications, nil
}

// Update updates an existing notification record
func (nr *NotificationRepository) Update(notification *models.Notification) error {
	// Prepare the SQL query
    query := `
        UPDATE notifications
        SET receiver_id = $2, data = $3, status = $4
        WHERE id = $1
    `

    // Execute the query
    _, err := nr.store.db.Exec(query, notification.ID, notification.ReceiverID, notification.Data, notification.Status)
    if err != nil {
        log.Println("Failed to execute query:", err)
        return err
    }

    return nil
}
