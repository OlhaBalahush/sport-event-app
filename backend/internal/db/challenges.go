package db

import (
	"database/sql"
	"log"

	"example.com/sport-event-app/backend/internal/db/models"
)

// ChallengeRepository provides methods for challenge-related database operations
type ChallengeRepository struct {
	db *sql.DB
}

// NewChallengeRepository creates a new ChallengeRepository instance
func NewChallengeRepository(db *sql.DB) *ChallengeRepository {
	return &ChallengeRepository{db: db}
}

// CreateChallenge inserts a new challenge into the database
func (cr *ChallengeRepository) CreateChallenge(challenge *models.Challenge) error {
	_, err := cr.db.Exec("INSERT INTO challenges (challenge_name, organization_name, organization_link, img, deadline, aim, award, overview, details_rules) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
		challenge.Name, challenge.OrganizationName, challenge.OrganizationLink, challenge.Img, challenge.Deadline, challenge.Aim, challenge.Award, challenge.Overview, challenge.DetailsRules)
	if err != nil {
		log.Println("Failed to create challenge:", err)
		return err
	}
	return nil
}

// GetChallengeByID retrieves a challenge from the database by ID
func (cr *ChallengeRepository) GetChallengeByID(id string) (*models.Challenge, error) {
	row := cr.db.QueryRow("SELECT id, challenge_name, organization_name, organization_link, img, deadline, aim, award, overview, details_rules, created_at FROM challenges WHERE id = $1", id)
	challenge := &models.Challenge{}
	err := row.Scan(&challenge.ID, &challenge.Name, &challenge.OrganizationName, &challenge.OrganizationLink, &challenge.Img, &challenge.Deadline, &challenge.Aim, &challenge.Award, &challenge.Overview, &challenge.DetailsRules, &challenge.CreatedAt)
	if err != nil {
		log.Println("Failed to get challenge by ID:", err)
		return nil, err
	}
	return challenge, nil
}

// GetAllChallenges retrieves all challenges from the database
func (cr *ChallengeRepository) GetAllChallenges() ([]*models.Challenge, error) {
	rows, err := cr.db.Query("SELECT id, challenge_name, organization_name, organization_link, img, deadline, aim, award, overview, details_rules, created_at FROM challenges")
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
func (cr *ChallengeRepository) UpdateChallenge(challenge *models.Challenge) error {
	_, err := cr.db.Exec("UPDATE challenges SET challenge_name=$1, organization_name=$2, organization_link=$3, img=$4, deadline=$5, aim=$6, award=$7, overview=$8, details_rules=$9 WHERE id=$10",
		challenge.Name, challenge.OrganizationName, challenge.OrganizationLink, challenge.Img, challenge.Deadline, challenge.Aim, challenge.Award, challenge.Overview, challenge.DetailsRules, challenge.ID)
	if err != nil {
		log.Println("Failed to update challenge:", err)
		return err
	}
	return nil
}

// DeleteChallenge deletes an existing challenge from the database
func (cr *ChallengeRepository) DeleteChallenge(id string) error {
	_, err := cr.db.Exec("DELETE FROM challenges WHERE id=$1", id)
	if err != nil {
		log.Println("Failed to delete challenge:", err)
		return err
	}
	return nil
}

// GetChallengesByCategoryName gets all challenges what has this categoryName
func (cr *ChallengeRepository) GetChallengesByCategoryName(categoryName string) ([]*models.Challenge, error) {
	// Prepare the SQL query
	query := `
        SELECT c.id, c.challenge_name, c.organization_name, c.organization_link, c.img, c.deadline, c.aim, c.award, c.overview, c.details_rules, c.created_at
        FROM challenges c
        JOIN category_relation cr ON c.id = cr.challenge_id
        JOIN categories cat ON cr.category_id = cat.id
        WHERE cat.name = $1
    `

	// Execute the query
	rows, err := cr.db.Query(query, categoryName)
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
    rows, err := cr.db.Query(query, userID)
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
    rows, err := cr.db.Query(query, userID)
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