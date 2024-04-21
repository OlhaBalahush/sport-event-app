package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sport-event-app/backend/internal/models"
)

func (s *server) handlerCreateFeedback() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		feedback := &models.EventFeedback{}
		if err := json.NewDecoder(r.Body).Decode(feedback); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		fmt.Print()

		f, err := s.store.Feedback().Create(feedback)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully created feedback!",
			Data:    f,
		})
	}
}
