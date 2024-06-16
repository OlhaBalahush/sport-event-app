package models

type Notification struct {
	ID         int              `db:"id" json:"id"`
	ReceiverID string           `db:"receiver_id" json:"receiverID"`
	Data       NotificationData `db:"data" json:"data"`
	Status     bool             `db:"status" json:"status"` // read or unread
	CreatedAt  string           `db:"created_at" json:"createdAt"`
}

type NotificationType string

const (
	RecommendationNotification NotificationType = "recommendation"
	JoiningNotification        NotificationType = "joining"
)

type NotificationData struct {
	Type      NotificationType `json:"type"`
	UserID    string           `json:"userID"`
	Username  string           `json:"username"`
	UserImg   string           `json:"userImg,omitempty"`
	EventID   string           `json:"eventID"`
	EventName string           `json:"eventName"`
	EventImg  string           `json:"eventImg,omitempty"`
}
