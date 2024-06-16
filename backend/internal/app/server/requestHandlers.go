package server

import (
	"encoding/json"
	"net/http"
	"sport-event-app/backend/internal/models"
	"sport-event-app/backend/pkg/router"
	"strconv"
)

func (s *server) handleGetAllRequests() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		requests, err := s.store.Request().Read()
		if err != nil {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}

		s.respond(w, r, http.StatusCreated, Response{
			Message: "Successfully taken all requests!",
			Data:    requests,
		})
	}
}

func (s *server) handleGetNumAllNotifications() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userId := r.Context().Value(ctxUserID).(string)
		notifications, err := s.store.Notification().Read(userId)
		if err != nil {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}
		num := 0
		for _, n := range notifications {
			if !n.Status {
				num += 1
			}
		}

		user, err := s.store.User().FindByID(userId)
		if user.Role == "admin" {
			requests, err := s.store.Request().Read()
			if err != nil {
				s.error(w, r, http.StatusUnprocessableEntity, err)
				return
			}

			num += len(requests)
		}

		s.respond(w, r, http.StatusCreated, Response{
			Message: "Successfully taken num of all notifications!",
			Data:    num,
		})
	}
}

func (s *server) handleGetAllNotifications() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userId := r.Context().Value(ctxUserID).(string)
		notifications, err := s.store.Notification().Read(userId)
		if err != nil {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}

		s.respond(w, r, http.StatusCreated, Response{
			Message: "Successfully taken all notifications!",
			Data:    notifications,
		})
	}
}

func (s *server) handlerRequest() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		request := &models.Request{}
		if err := json.NewDecoder(r.Body).Decode(request); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		userId := r.Context().Value(ctxUserID).(string)
		request.UserID = userId

		_, err := s.store.Request().Create(request)
		if err != nil {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}

		s.respond(w, r, http.StatusCreated, Response{
			Message: "Successfully request added!",
			Data:    request,
		})
	}
}

func (s *server) handleGetUserRequestStatus() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userId := r.Context().Value(ctxUserID).(string)

		res, err := s.store.Request().CheckByUserID(userId)
		if err != nil {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}

		s.respond(w, r, http.StatusCreated, Response{
			Message: "Successfully request status!",
			Data:    res,
		})
	}
}

func (s *server) handleUpdateRequest() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := router.Param(r.Context(), "id")
		status := router.Param(r.Context(), "status")

		idInt, err := strconv.Atoi(id)
		if err != nil {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}

		if status == "approve" {
			request, err := s.store.Request().FindByID(idInt)
			if err != nil {
				s.error(w, r, http.StatusUnprocessableEntity, err)
				return
			}

			userID := request.UserID
			user, err := s.store.User().FindByID(userID)
			if err != nil {
				s.error(w, r, http.StatusUnprocessableEntity, err)
				return
			}
			user.Role = "organizer"

			err = s.store.User().Update(user)
			if err != nil {
				s.error(w, r, http.StatusUnprocessableEntity, err)
				return
			}
		} else if status != "reject" {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}

		err = s.store.Request().Delete(id)
		if err != nil {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}

		s.respond(w, r, http.StatusCreated, Response{
			Message: "Successfully processed request!",
		})
	}
}
