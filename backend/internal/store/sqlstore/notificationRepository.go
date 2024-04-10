package sqlstore

import "sport-event-app/backend/internal/models"

type NotificationRepository struct {
	store *Store
}

// Create implements store.NotificationRepository.
func (*NotificationRepository) Create(user *models.Notification) error {
	panic("unimplemented")
}

// Delete implements store.NotificationRepository.
func (*NotificationRepository) Delete(id string) error {
	panic("unimplemented")
}

// Read implements store.NotificationRepository.
func (*NotificationRepository) Read() ([]*models.Notification, error) {
	panic("unimplemented")
}

// Update implements store.NotificationRepository.
func (*NotificationRepository) Update(user *models.Notification) error {
	panic("unimplemented")
}
