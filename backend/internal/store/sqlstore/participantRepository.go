package sqlstore

import (
	"log"
	"sport-event-app/backend/internal/models"

	"github.com/lib/pq"
)

type ParticipantRepository struct {
	store *Store
}

// EVENT

// AddEventParticipant adds a user as a participant to an event
func (pr *ParticipantRepository) AddEventParticipant(userID, eventID string) error {
	// Prepare the SQL query
	query := `
        INSERT INTO event_participant (user_id, event_id)
        VALUES ($1, $2)
    `

	// Execute the query
	_, err := pr.store.db.Exec(query, userID, eventID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return err
	}

	return nil
}

// RemoveEventParticipant removes a user as a participant from an event
func (pr *ParticipantRepository) RemoveEventParticipant(userID, eventID string) error {
	// Prepare the SQL query
	query := `
        DELETE FROM event_participant
        WHERE user_id = $1 AND event_id = $2
    `

	// Execute the query
	_, err := pr.store.db.Exec(query, userID, eventID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return err
	}

	return nil
}

// GetEventParticipantsByID retrieves all participants for an event by its ID
func (pr *ParticipantRepository) GetEventParticipantsByID(eventID string) ([]*models.Participant, error) {
	// Prepare the SQL query
	query := `
        SELECT u.id, u.username, u.img
        FROM users u
        JOIN event_participant ep ON u.id = ep.user_id
        WHERE ep.event_id = $1
    `

	// Execute the query
	rows, err := pr.store.db.Query(query, eventID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return nil, err
	}
	defer rows.Close()

	// Iterate over the rows and collect participants
	var participants []*models.Participant
	for rows.Next() {
		participant := &models.Participant{}
		if err := rows.Scan(&participant.UserID, &participant.Username, &participant.UserImg); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		participants = append(participants, participant)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return participants, nil
}

// IsEventParticipant says if user joined an event by its IDs or no
func (pr *ParticipantRepository) IsEventParticipant(eventID string, userID string) (bool, error) {
	// Query the event_participant table to check if the user is a participant of the event
	query := `SELECT EXISTS(SELECT 1 FROM event_participant WHERE user_id = $1 AND event_id = $2)`
	var exists bool
	err := pr.store.db.QueryRow(query, userID, eventID).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}

// CHALLENGE

// AddChallengeParticipant adds a user as a participant to a challenge with points
func (pr *ParticipantRepository) AddChallengeParticipant(userID, challengeID string, points int) error {
	// Prepare the SQL query
	query := `
        INSERT INTO challenge_participant (challenge_id, user_id, points)
        VALUES ($1, $2, $3)
    `

	// Execute the query to add the participant
	_, err := pr.store.db.Exec(query, challengeID, userID, points)
	if err != nil {
		// Check if the error is due to unique constraint violation
		pqErr, ok := err.(*pq.Error)
		if ok && pqErr.Code == "23505" { // 23505 is the PostgreSQL error code for unique violation
			// Remove the existing participant
			err := pr.RemoveChallengeParticipant(userID, challengeID)
			if err != nil {
				log.Println("Failed to remove existing participant:", err)
				return err
			}
			return nil
		}
		// If the error is not due to unique constraint violation, return the error
		log.Println("Failed to execute query:", err)
		return err
	}

	return nil
}

// RemoveChallengeParticipant removes a user as a participant from a challenge
func (pr *ParticipantRepository) RemoveChallengeParticipant(userID, challengeID string) error {
	// Prepare the SQL query
	query := `
        DELETE FROM challenge_participant
        WHERE user_id = $1 AND challenge_id = $2
    `

	// Execute the query
	_, err := pr.store.db.Exec(query, userID, challengeID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return err
	}

	return nil
}

// UpdateChallengeParticipantPoints updates the points for a participant in a challenge
func (pr *ParticipantRepository) UpdateChallengeParticipantPoints(userID, challengeID string, points int) error {
	// Prepare the SQL query
	query := `
        UPDATE challenge_participant
        SET points = $3
        WHERE user_id = $1 AND challenge_id = $2
    `

	// Execute the query
	_, err := pr.store.db.Exec(query, userID, challengeID, points)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return err
	}

	return nil
}

// GetChallengeParticipantsByID retrieves all participants for a challenge by its ID
func (pr *ParticipantRepository) GetChallengeParticipantsByID(challengeID string) ([]*models.Participant, error) {
	// Prepare the SQL query
	query := `
        SELECT u.id, u.username, u.img, cp.points
        FROM users u
        JOIN challenge_participant cp ON u.id = cp.user_id
        WHERE cp.challenge_id = $1
    `

	// Execute the query
	rows, err := pr.store.db.Query(query, challengeID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return nil, err
	}
	defer rows.Close()

	// Iterate over the rows and collect participants
	var participants []*models.Participant
	for rows.Next() {
		participant := &models.Participant{}
		if err := rows.Scan(&participant.UserID, &participant.Username, &participant.UserImg, &participant.Points); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		participants = append(participants, participant)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return participants, nil
}

// IsEventParticipant says if user joined an event by its IDs or no
func (pr *ParticipantRepository) IsChallengeParticipant(challengeID string, userID string) (bool, error) {
	// Query the event_participant table to check if the user is a participant of the event
	query := `SELECT EXISTS(SELECT 1 FROM challenge_participant WHERE user_id = $1 AND challenge_id = $2)`
	var exists bool
	err := pr.store.db.QueryRow(query, userID, challengeID).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}
