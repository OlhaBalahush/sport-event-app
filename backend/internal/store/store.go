package store

type Store interface {
	User() UserRepository
	Event() EventRepository
	Challenge() ChallengeRepository
	Feedback() FeedbackRepository
	Participant() ParticipantRepository
	Request() RequestRepository
	Notification() NotificationRepository
	Category() CategoryRepository
}
