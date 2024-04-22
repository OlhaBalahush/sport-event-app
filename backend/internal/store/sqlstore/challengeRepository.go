package sqlstore

import (
	"log"
	"sport-event-app/backend/internal/models"
)

type ChallengeRepository struct {
	store *Store
}

// CreateChallenge inserts a new challenge into the database
func (cr *ChallengeRepository) Create(challenge *models.Challenge) (string, error) {
	var id string
	err := cr.store.db.QueryRow("INSERT INTO challenges (challenge_name, organization_name, organization_link, img, deadline, aim, award, overview, details_rules) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
		challenge.Name, challenge.OrganizationName, challenge.OrganizationLink, challenge.Img, challenge.Deadline, challenge.Aim, challenge.Award, challenge.Overview, challenge.DetailsRules).Scan(&id)
	if err != nil {
		log.Println("Failed to create challenge:", err)
		return "", err
	}

	return id, nil
}

// GetChallengeByID retrieves a challenge from the database by ID
func (cr *ChallengeRepository) FindByID(id string) (*models.Challenge, error) {
	row := cr.store.db.QueryRow("SELECT id, challenge_name, organization_name, organization_link, img, deadline, aim, award, overview, details_rules, created_at FROM challenges WHERE id = $1", id)
	challenge := &models.Challenge{}
	err := row.Scan(&challenge.ID, &challenge.Name, &challenge.OrganizationName, &challenge.OrganizationLink, &challenge.Img, &challenge.Deadline, &challenge.Aim, &challenge.Award, &challenge.Overview, &challenge.DetailsRules, &challenge.CreatedAt)
	if err != nil {
		log.Println("Failed to get challenge by ID:", err)
		return nil, err
	}
	return challenge, nil
}

// GetAllChallenges retrieves all challenges from the database
func (cr *ChallengeRepository) Read() ([]*models.Challenge, error) {
	rows, err := cr.store.db.Query("SELECT id, challenge_name, organization_name, organization_link, img, deadline, aim, award, overview, details_rules, created_at FROM challenges")
	if err != nil {
		log.Println("Failed to get all challenges:", err)
		return nil, err
	}
	defer rows.Close()

	var challenges []*models.Challenge
	for rows.Next() {
		challenge := &models.Challenge{}
		err := rows.Scan(&challenge.ID, &challenge.Name, &challenge.OrganizationName, &challenge.OrganizationLink, &challenge.Img, &challenge.Deadline, &challenge.Aim, &challenge.Award, &challenge.Overview, &challenge.DetailsRules, &challenge.CreatedAt)
		if err != nil {
			log.Println("Failed to scan challenge row:", err)
			return nil, err
		}
		challenges = append(challenges, challenge)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over challenge rows:", err)
		return nil, err
	}

	return challenges, nil
}

// UpdateChallenge updates an existing challenge in the database
func (cr *ChallengeRepository) Update(challenge *models.Challenge) error {
	_, err := cr.store.db.Exec("UPDATE challenges SET challenge_name=$1, organization_name=$2, organization_link=$3, img=$4, deadline=$5, aim=$6, award=$7, overview=$8, details_rules=$9 WHERE id=$10",
		challenge.Name, challenge.OrganizationName, challenge.OrganizationLink, challenge.Img, challenge.Deadline, challenge.Aim, challenge.Award, challenge.Overview, challenge.DetailsRules, challenge.ID)
	if err != nil {
		log.Println("Failed to update challenge:", err)
		return err
	}
	return nil
}

// DeleteChallenge deletes an existing challenge from the database
func (cr *ChallengeRepository) Delete(id string) error {
	_, err := cr.store.db.Exec("DELETE FROM challenges WHERE id=$1", id)
	if err != nil {
		log.Println("Failed to delete challenge:", err)
		return err
	}
	return nil
}

// GetChallengesByCategoryName gets all challenges what has this categoryName
func (cr *ChallengeRepository) GetByCategoryName(categoryName string) ([]*models.Challenge, error) {
	// Prepare the SQL query
	query := `
        SELECT c.id, c.challenge_name, c.organization_name, c.organization_link, c.img, c.deadline, c.aim, c.award, c.overview, c.details_rules, c.created_at
        FROM challenges c
        JOIN category_relation cr ON c.id = cr.challenge_id
        JOIN categories cat ON cr.category_id = cat.id
        WHERE cat.name = $1
    `

	// Execute the query
	rows, err := cr.store.db.Query(query, categoryName)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return nil, err
	}
	defer rows.Close()

	// Iterate over the rows and collect challenges
	var challenges []*models.Challenge
	for rows.Next() {
		challenge := &models.Challenge{}
		if err := rows.Scan(&challenge.ID, &challenge.Name, &challenge.OrganizationName, &challenge.OrganizationLink, &challenge.Img, &challenge.Deadline, &challenge.Aim, &challenge.Award, &challenge.Overview, &challenge.DetailsRules, &challenge.CreatedAt); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		challenges = append(challenges, challenge)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return challenges, nil
}

// GetSavedChallengesForUser retrieves all saved challenges for a specific user
func (cr *ChallengeRepository) GetSavedChallengesForUser(userID string) ([]*models.Challenge, error) {
	// Prepare the SQL query
	query := `
        SELECT c.id, c.challenge_name, c.organization_name, c.organization_link, c.img, c.deadline, c.aim, c.award, c.overview, c.details_rules, c.created_at
        FROM challenges c
        JOIN saved_challenges sc ON c.id = sc.challenge_id
        WHERE sc.user_id = $1
    `

	// Execute the query
	rows, err := cr.store.db.Query(query, userID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return nil, err
	}
	defer rows.Close()

	// Iterate over the rows and collect saved challenges
	var challenges []*models.Challenge
	for rows.Next() {
		challenge := &models.Challenge{}
		if err := rows.Scan(&challenge.ID, &challenge.Name, &challenge.OrganizationName, &challenge.OrganizationLink, &challenge.Img, &challenge.Deadline, &challenge.Aim, &challenge.Award, &challenge.Overview, &challenge.DetailsRules, &challenge.CreatedAt); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		challenges = append(challenges, challenge)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return challenges, nil
}

// GetChallengesParticipatedByUser retrieves all challenges in which a user participated along with their points
func (cr *ChallengeRepository) GetChallengesParticipatedByUser(userID string) ([]*models.Challenge, error) {
	// Prepare the SQL query
	query := `
        SELECT c.id, c.challenge_name, c.organization_name, c.organization_link, c.img, c.deadline, c.aim, c.award, c.overview, c.details_rules, c.created_at, cp.points
        FROM challenges c
        JOIN challenge_participant cp ON c.id = cp.challenge_id
        WHERE cp.user_id = $1
    `

	// Execute the query
	rows, err := cr.store.db.Query(query, userID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return nil, err
	}
	defer rows.Close()

	// Iterate over the rows and collect participated challenges along with points
	var challenges []*models.Challenge
	for rows.Next() {
		challenge := &models.Challenge{}
		if err := rows.Scan(&challenge.ID, &challenge.Name, &challenge.OrganizationName, &challenge.OrganizationLink, &challenge.Img, &challenge.Deadline, &challenge.Aim, &challenge.Award, &challenge.Overview, &challenge.DetailsRules, &challenge.CreatedAt, &challenge.Points); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		challenges = append(challenges, challenge)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return challenges, nil
}

func (cr *ChallengeRepository) Save(eventID string, userID string) error {
	// Check if the event is already saved
	exists, err := cr.IsSaved(eventID, userID)
	if err != nil {
		log.Println("Failed to check if event is saved:", err)
		return err
	}

	// If the event is already saved, remove it before inserting
	if exists {
		err := cr.RemoveSavedChallenge(eventID, userID)
		if err != nil {
			log.Println("Failed to remove existing saved event:", err)
			return err
		}
		return nil
	}

	// Prepare the SQL query for insertion
	query := `
		INSERT INTO saved_challenges (user_id, challenge_id)
		VALUES ($1, $2)
    `

	// Execute the query to save the event
	_, err = cr.store.db.Exec(query, userID, eventID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return err
	}

	return nil
}

func (cr *ChallengeRepository) IsSaved(challengeID string, userID string) (bool, error) {
	// Query the saved_challenge table to check if the user is a participant of the event
	query := `SELECT EXISTS(SELECT 1 FROM saved_challenges WHERE user_id = $1 AND challenge_id = $2)`
	var exists bool
	err := cr.store.db.QueryRow(query, userID, challengeID).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}

func (cr *ChallengeRepository) RemoveSavedChallenge(challengeID string, userID string) error {
	// Prepare the SQL query for deletion
	query := `
        DELETE FROM saved_challenges
        WHERE user_id = $1 AND challenge_id = $2
    `

	// Execute the query to remove the saved event
	_, err := cr.store.db.Exec(query, userID, challengeID)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return err
	}

	return nil
}
