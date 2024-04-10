package models

import "time"

// EventFeedback represents feedback data for an event
type EventFeedback struct {
    ID        int     
    EventID   string   
    UserID    string   
    Comment   string   
    Img       string   
    Rate      int      
    CreatedAt time.Time
}