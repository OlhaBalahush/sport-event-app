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

	GetImagesByEventID(eventID string) ([]string, error)
	DeleteImagesByEventID(eventID string) error

	Save(eventID string, userID string) error
	IsSaved(eventID string, userID string) (bool, error)
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

	Save(challengeID string, userID string) error
	IsSaved(challengeID string, userID string) (bool, error)
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
	IsEventParticipant(eventID string, userID string) (bool, error)

	AddChallengeParticipant(userID, challengeID string, points int) error
	RemoveChallengeParticipant(userID, challengeID string) error
	UpdateChallengeParticipantPoints(userID, challengeID string, points int) error
	GetChallengeParticipantsByID(challengeID string) ([]*models.Participant, error)
	IsChallengeParticipant(challengeID string, userID string) (bool, error)
}

type RequestRepository interface {
	Create(request *models.Request) (int, error)
	Update(request *models.Request) error
	Read() ([]*models.Request, error)
	Delete(id string) error
	CheckByUserID(id string) (bool, error)
}

type NotificationRepository interface {
	Create(notification *models.Notification) (int, error)
	Update(notification *models.Notification) error
	Read(userID string) ([]*models.Notification, error)
	Delete(id string) error
}
