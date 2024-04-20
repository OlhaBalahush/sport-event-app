package server

import (
	"net/http"
	"net/url"
	"sport-event-app/backend/pkg/router"
)

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
