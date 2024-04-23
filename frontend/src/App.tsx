import './index.css';
import { AuthProvider } from './components/context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainEvents from './components/MainEvents';
import EventPage from './components/Event';
import ChallengesPage from './components/Challenges';
import ChallengePage from './components/Challenge';
import UserPage from './components/User';
import Notifications from './components/Notifications';
import CreateEvent from './components/CreateEvent';
import CreateChallenge from './components/CreateChallenge';

const PORT: string = 'http://localhost:7080'

function App() {
  return (
    <AuthProvider PORT={PORT}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<MainEvents PORT={PORT} />}
            />
            <Route
              path='/challenges'
              element={<ChallengesPage PORT={PORT} />}
            />
            <Route
              path='/event/:id'
              element={<EventPage PORT={PORT} />}
            />
            <Route
              path='/challenge/:id'
              element={<ChallengePage PORT={PORT} />}
            />
            <Route
              path='/user/:id'
              element={<UserPage PORT={PORT} />}
            />
            <Route
              path='/notifications'
              element={<Notifications PORT={PORT} />}
            />
            <Route
              path='/create-event'
              element={<CreateEvent PORT={PORT} />}
            />
            <Route
              path='/create-challenge'
              element={<CreateChallenge PORT={PORT} />}
            />
            {/* TODO add other routes */}
            <Route path='*' element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
