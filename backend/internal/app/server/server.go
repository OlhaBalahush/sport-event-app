package server

import (
	"encoding/json"
	"log"
	"net/http"
	"sport-event-app/backend/internal/models"
	"sport-event-app/backend/internal/store"
	"sport-event-app/backend/pkg/router"
)

const (
	sessionName     = "session"
	jwtKey          = "JWT_KEY"
	ctxKeyRequestID = iota
)

type ctxKey int

const ctxUserID ctxKey = 1

type server struct {
	router *router.Router
	store  store.Store
	logger *log.Logger
	Server *http.Server
}

func newServer(store store.Store, srv *http.Server, r *router.Router) *server {
	s := &server{
		router: r,
		store:  store,
		logger: log.Default(),
		Server: srv,
	}

	s.configureRouter()

	return s
}

func (s *server) configureRouter() {
	//Middleware usage
	s.router.Use(s.setRequestID, s.logRequest)
	s.router.UseWithPrefix("/jwt", s.jwtMiddleware)
	s.router.UseWithPrefix("/organizer", s.organizerMiddleware)
	s.router.UseWithPrefix("/admin", s.adminMiddleware)
	//USERS
	s.router.POST("/api/v1/users/create", s.handlerCreateUser())
	s.router.POST("/api/v1/users/login", s.handlerLoginUser())
	s.router.GET("/api/v1/users/logout", s.handlerLogOut())
	s.router.GET("/api/v1/auth/checkCookie", s.handlerCheckCookie())

	//EVENTS
	s.router.GET("/api/v1/events", s.handlerGetAllEvents())
	s.router.GET("/api/v1/events/category/:category", s.handlerGetEventsByCategory())
	s.router.GET("/api/v1/events/:id", s.handlerGetEventByID())

	s.router.GET("/api/v1/events/attendants/:id", s.handlerGetEventAttendees())
	s.router.GET("/api/v1/events/feedback/:id", s.handlerGetEventFeedback())
	s.router.GET("/api/v1/events/imgs/:id", s.handlerGetEventImgs())
	s.router.GET("/api/v1/events/categories/:id", s.handlerGetEventCategories())
	s.router.GET("/api/v1/jwt/events/joined/:id", s.handleGetEventJoiningStatus())
	s.router.GET("/api/v1/jwt/events/saved/:id", s.handleGetEventSavingStatus())
	s.router.GET("/api/v1/jwt/events/join/:id", s.handleJoinEvent())
	s.router.GET("/api/v1/jwt/events/save/:id", s.handleSaveEvent())

	s.router.POST("/api/v1/feedback/create", s.handlerCreateFeedback())

	//CATEGORIES
	s.router.GET("/api/v1/categories", s.handlerGetAllCategories())

	//CHALLENGES
	s.router.GET("/api/v1/challenges", s.handlerGetAllChallenges())
	s.router.GET("/api/v1/challenges/:id", s.handlerGetChallengeByID())
	s.router.GET("/api/v1/challenges/category/:category", s.handlerGetChallengeByCategory())

	s.router.GET("/api/v1/challenges/attendants/:id", s.handlerGetChallengeAttendees())
	s.router.GET("/api/v1/challenges/categories/:id", s.handlerGetChallengeCategories())
	s.router.GET("/api/v1/jwt/challenges/joined/:id", s.handleGetChallengeJoiningStatus())
	s.router.GET("/api/v1/jwt/challenges/saved/:id", s.handleGetChallengeSavingStatus())
	s.router.GET("/api/v1/jwt/challenges/join/:id", s.handleJoinChallenge())
	s.router.GET("/api/v1/jwt/challenges/save/:id", s.handleSaveChallenge())

	s.router.POST("/test", s.test())
	//<------------AUTH MIDDLEWARE REQUIRED-------------->
	//USERS
	s.router.GET("/api/v1/jwt/users", s.handlerGetAllUsers())
	s.router.GET("/api/v1/users/:id", s.handlerGetUser())
	s.router.GET("/api/v1/users/categories/:id", s.handlerGetUserCategories())
	s.router.GET("/api/v1/users/:id/challenges/:type", s.handlerGetUserChallenges())
	s.router.GET("/api/v1/users/:id/events/:type", s.handlerGetUserEvents())

	//<------------AUTH + ADMIN MIDDLEWARE REQUIRED-------------->
	//USERS

}

func (s *server) test() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user := &models.User{}
		if err := json.NewDecoder(r.Body).Decode(user); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		_, err := s.store.User().Create(user)
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
			return
		}

		s.respond(w, r, http.StatusOK, Response{
			Message: "Successfully retrieved all users!",
			Data:    nil,
		})
	}
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.router.ServeHTTP(w, r)
}

func (s *server) error(w http.ResponseWriter, r *http.Request, code int, err error) {
	s.respond(w, r, code, map[string]string{"error": err.Error()})
}

func (s *server) respond(w http.ResponseWriter, r *http.Request, code int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	if data != nil {
		json.NewEncoder(w).Encode(data)
	}
}
