package store

import "sport-event-app/backend/internal/models"

type UserRepository interface {
	Create(user *models.User) (string, error)
	Update(user *models.User) error
	Read() ([]*models.User, error)
	Delete(id string) error

	FindByID(id string) (*models.User, error)
	Check(login string) (*models.User, error)
}

type EventRepository interface {
	Create(user *models.Event) (string, error)
	Update(user *models.Event) error
	Read() ([]*models.Event, error)
	Delete(id string) error

	FindByID(id string) (*models.Event, error)
	GetByCategoryName(categoryName string) ([]*models.Event, error)
	GetSavedEventsForUser(userID string) ([]*models.Event, error)
	GetEventsParticipatedByUser(userID string) ([]*models.Event, error)
}

type ChallengeRepository interface {
	Create(user *models.Challenge) (string, error)
	Update(user *models.Challenge) error
	Read() ([]*models.Challenge, error)
	Delete(id string) error

	FindByID(id string) (*models.Challenge, error)
	GetByCategoryName(categoryName string) ([]*models.Challenge, error)
	GetSavedChallengesForUser(userID string) ([]*models.Challenge, error)
	GetChallengesParticipatedByUser(userID string) ([]*models.Challenge, error)
}

type CategoryRepository interface {
	Create(user *models.Category) (int, error)
	Update(user *models.Category) error
	Read() ([]*models.Category, error)
	Delete(id int) error

	FindByID(id int) (*models.Category, error)
	GetByFRID(id string, flag string) ([]*models.Category, error)
}

type FeedbackRepository interface {
	Create(user *models.EventFeedback) (int, error)
	Update(user *models.EventFeedback) error
	Read(eventID string) ([]*models.EventFeedback, error)
	Delete(id string) error
}

type ParticipantRepository interface {
	AddEventParticipant(userID, eventID string) error
	RemoveEventParticipant(userID, eventID string) error
	GetEventParticipantsByID(eventID string) ([]*models.Participant, error)

	AddChallengeParticipant(userID, challengeID string, points int) error
	RemoveChallengeParticipant(userID, challengeID string) error
	UpdateChallengeParticipantPoints(userID, challengeID string, points int) error
	GetChallengeParticipantsByID(challengeID string) ([]*models.Participant, error)
}

type RequestRepository interface {
	Create(user *models.Request) error
	Update(user *models.Request) error
	Read() ([]*models.Request, error)
	Delete(id string) error
}

type NotificationRepository interface {
	Create(user *models.Notification) (int, error)
	Update(user *models.Notification) error
	Read(userID string) ([]*models.Notification, error)
	Delete(id string) error
}
