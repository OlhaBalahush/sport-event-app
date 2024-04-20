package server

import (
	"net/http"
	"net/url"
	"sport-event-app/backend/pkg/router"
)

func (s *server) handlerGetAllEvents() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		data, err := s.store.Event().Read()
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully retrieved all events!",
			Data:    data,
		})
	}
}

func (s *server) handlerGetEventByID() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")

		if id == "" {
			id = r.Context().Value(ctxUserID).(string)
		}
		event, err := s.store.Event().FindByID(id)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got event!",
			Data:    event,
		})
	}
}

func (s *server) handlerGetEventsByCategory() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		categoryName := router.Param(r.Context(), "category")
		decodedString, err := url.QueryUnescape(categoryName)

		events, err := s.store.Event().GetByCategoryName(decodedString)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got events!",
			Data:    events,
		})
	}
}

func (s *server) handlerGetEventAttendees() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")

		if id == "" {
			id = r.Context().Value(ctxUserID).(string)
		}
		attendees, err := s.store.Participant().GetEventParticipantsByID(id)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got event attendees!",
			Data:    attendees,
		})
	}
}
