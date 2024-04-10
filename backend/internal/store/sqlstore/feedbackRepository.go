package sqlstore

import "sport-event-app/backend/internal/models"

type FeedbackRepository struct {
	store *Store
}

// Create implements store.FeedbackRepository.
func (*FeedbackRepository) Create(user *models.EventFeedback) error {
	panic("unimplemented")
}

// Delete implements store.FeedbackRepository.
func (*FeedbackRepository) Delete(id string) error {
	panic("unimplemented")
}

// Read implements store.FeedbackRepository.
func (*FeedbackRepository) Read() ([]*models.EventFeedback, error) {
	panic("unimplemented")
}

// Update implements store.FeedbackRepository.
func (*FeedbackRepository) Update(user *models.EventFeedback) error {
	panic("unimplemented")
}
