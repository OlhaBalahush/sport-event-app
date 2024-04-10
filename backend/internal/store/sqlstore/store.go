package sqlstore

import (
	"database/sql"
	"sport-event-app/backend/internal/store"
)

type Store struct {
	db             *sql.DB
	userRepository *UserRepository
	eventRepository *EventRepository
	challengeRepository *ChallengeRepository
	feedbackRepository *FeedbackRepository
	participantRepository *ParticipantRepository
	requestRepository *RequestRepository
	notificationRepository *NotificationRepository
	categoryRepository *CategoryRepository
}

func New(db *sql.DB) *Store {
	return &Store{
		db: db,
	}
}

func (s *Store) User() store.UserRepository {
	if s.userRepository != nil {
		return s.userRepository
	}

	s.userRepository = &UserRepository{
		store: s,
	}

	return s.userRepository
}

func (s *Store) Event() store.EventRepository {
	if s.eventRepository != nil {
		return s.eventRepository
	}

	s.eventRepository = &EventRepository{
		store: s,
	}

	return s.eventRepository
}

func (s *Store) Challenge() store.ChallengeRepository {
	if s.challengeRepository != nil {
		return s.challengeRepository
	}

	s.challengeRepository = &ChallengeRepository{
		store: s,
	}

	return s.challengeRepository
}

func (s *Store) Feedback() store.FeedbackRepository {
	if s.feedbackRepository != nil {
		return s.feedbackRepository
	}

	s.feedbackRepository = &FeedbackRepository{
		store: s,
	}

	return s.feedbackRepository
}

func (s *Store) Participant() store.ParticipantRepository {
	if s.participantRepository != nil {
		return s.participantRepository
	}

	s.participantRepository = &ParticipantRepository{
		store: s,
	}

	return s.participantRepository
}

func (s *Store) Request() store.RequestRepository {
	if s.requestRepository != nil {
		return s.requestRepository
	}

	s.requestRepository = &RequestRepository{
		store: s,
	}

	return s.requestRepository
}

func (s *Store) Notification() store.NotificationRepository {
	if s.notificationRepository != nil {
		return s.notificationRepository
	}

	s.notificationRepository = &NotificationRepository{
		store: s,
	}

	return s.notificationRepository
}

func (s *Store) Category() store.CategoryRepository {
	if s.categoryRepository != nil {
		return s.categoryRepository
	}

	s.categoryRepository = &CategoryRepository{
		store: s,
	}

	return s.categoryRepository
}