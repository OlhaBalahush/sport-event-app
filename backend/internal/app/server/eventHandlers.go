package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"sport-event-app/backend/internal/models"
	"sport-event-app/backend/pkg/router"
)

func (s *server) handleCreateEvent() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		event := &models.Event{}
		if err := json.NewDecoder(r.Body).Decode(event); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		userId := r.Context().Value(ctxUserID).(string)
		event.OrganizerID = userId
		
		fmt.Println("Event", event)

		data, err := s.store.Event().Create(event)
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

func (s *server) handlerGetEventFeedback() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")

		if id == "" {
			id = r.Context().Value(ctxUserID).(string)
		}
		feedback, err := s.store.Feedback().Read(id)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got event feedback!",
			Data:    feedback,
		})
	}
}

func (s *server) handlerGetEventCategories() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")

		if id == "" {
			id = r.Context().Value(ctxUserID).(string)
		}
		categories, err := s.store.Category().GetByFRID(id, "event")
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got event categories!",
			Data:    categories,
		})
	}
}

func (s *server) handlerGetEventImgs() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")

		if id == "" {
			id = r.Context().Value(ctxUserID).(string)
		}
		imgs, err := s.store.Event().GetImagesByEventID(id)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got event imgs!",
			Data:    imgs,
		})
	}
}

func (s *server) handleGetEventJoiningStatus() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")
		userId := r.Context().Value(ctxUserID).(string)

		res, err := s.store.Participant().IsEventParticipant(id, userId)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got joining status!",
			Data:    res,
		})
	}
}

func (s *server) handleJoinEvent() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")
		userId := r.Context().Value(ctxUserID).(string)

		err := s.store.Participant().AddEventParticipant(userId, id)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully joined event!",
		})
	}
}

func (s *server) handleGetEventSavingStatus() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")
		userId := r.Context().Value(ctxUserID).(string)

		res, err := s.store.Event().IsSaved(id, userId)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got saving status!",
			Data:    res,
		})
	}
}

func (s *server) handleSaveEvent() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")
		userId := r.Context().Value(ctxUserID).(string)

		err := s.store.Event().Save(id, userId)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully saved event!",
		})
	}
}
