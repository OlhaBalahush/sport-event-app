package sqlstore

import "sport-event-app/backend/internal/models"

type ParticipantRepository struct {
	store *Store
}

// Create implements store.ParticipantRepository.
func (*ParticipantRepository) Create(user *models.Participant) error {
	panic("unimplemented")
}

// Delete implements store.ParticipantRepository.
func (*ParticipantRepository) Delete(id string) error {
	panic("unimplemented")
}

// Read implements store.ParticipantRepository.
func (*ParticipantRepository) Read() ([]*models.Participant, error) {
	panic("unimplemented")
}

// Update implements store.ParticipantRepository.
func (*ParticipantRepository) Update(user *models.Participant) error {
	panic("unimplemented")
}
