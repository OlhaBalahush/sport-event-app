package models

type 	Notification struct {
	ID         int              `json:"id"`
	ReceiverID int              `json:"receiverID"`
	Data       NotificationData `json:"data"`
	Status     bool             `json:"status"` // read or unread
	Timestamp  string           `json:"timestamp"`
}

type NotificationType string

const (
	RecommendationNotification  NotificationType = "recommendation"
	JoiningNotification NotificationType = "joining"
)

type NotificationData struct {
	Type NotificationType `json:"type"`
	UserID string `json:"userID"`
	Username string `json:"username"`
	UserImg string `json:"userImg,omitempty"`
	EventID string `json:"eventID"`
	EventName string `json:"eventName"`
	EventImg string `json:"eventImg,omitempty"`
}