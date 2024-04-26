package server

import (
	"encoding/json"
	"net/http"
	"net/url"
	"sport-event-app/backend/internal/models"
	"sport-event-app/backend/pkg/router"
)

func (s *server) handleCreateChallenges() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//
		challenge := &models.Challenge{}
		if err := json.NewDecoder(r.Body).Decode(challenge); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		data, err := s.store.Challenge().Create(challenge)
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully created challenge!",
			Data:    data,
		})
	}
}

func (s *server) handlerGetAllChallenges() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		data, err := s.store.Challenge().Read()
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully retrieved all challenges!",
			Data:    data,
		})
	}
}

func (s *server) handlerGetChallengeByID() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")

		if id == "" {
			id = r.Context().Value(ctxUserID).(string)
		}

		data, err := s.store.Challenge().FindByID(id)
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully retrieved challenge!",
			Data:    data,
		})
	}
}

func (s *server) handlerGetChallengeByCategory() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		categoryName := router.Param(r.Context(), "category")
		decodedString, err := url.QueryUnescape(categoryName)

		challenges, err := s.store.Challenge().GetByCategoryName(decodedString)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got challenges!",
			Data:    challenges,
		})
	}
}

func (s *server) handlerGetChallengeAttendees() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")

		if id == "" {
			id = r.Context().Value(ctxUserID).(string)
		}

		attendants, err := s.store.Participant().GetChallengeParticipantsByID(id)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got attendants!",
			Data:    attendants,
		})
	}
}

func (s *server) handlerGetChallengeCategories() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")

		if id == "" {
			id = r.Context().Value(ctxUserID).(string)
		}
		categories, err := s.store.Category().GetByFRID(id, "challenge")
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully got challenge categories!",
			Data:    categories,
		})
	}
}

func (s *server) handleGetChallengeJoiningStatus() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")
		userId := r.Context().Value(ctxUserID).(string)

		res, err := s.store.Participant().IsChallengeParticipant(id, userId)
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

func (s *server) handleGetChallengeSavingStatus() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")
		userId := r.Context().Value(ctxUserID).(string)

		res, err := s.store.Challenge().IsSaved(id, userId)
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

func (s *server) handleJoinChallenge() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")
		userId := r.Context().Value(ctxUserID).(string)

		err := s.store.Participant().AddChallengeParticipant(userId, id, 0)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully joined challenge!",
		})
	}
}

func (s *server) handleSaveChallenge() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")
		userId := r.Context().Value(ctxUserID).(string)

		err := s.store.Challenge().Save(id, userId)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully save challenge!",
		})
	}
}
