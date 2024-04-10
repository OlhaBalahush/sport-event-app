package sqlstore

import "sport-event-app/backend/internal/models"

type RequestRepository struct {
	store *Store
}

// Create implements store.RequestRepository.
func (*RequestRepository) Create(user *models.Request) error {
	panic("unimplemented")
}

// Delete implements store.RequestRepository.
func (*RequestRepository) Delete(id string) error {
	panic("unimplemented")
}

// Read implements store.RequestRepository.
func (*RequestRepository) Read() ([]*models.Request, error) {
	panic("unimplemented")
}

// Update implements store.RequestRepository.
func (*RequestRepository) Update(user *models.Request) error {
	panic("unimplemented")
}
