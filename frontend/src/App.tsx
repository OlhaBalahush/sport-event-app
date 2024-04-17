import './index.css';
import { AuthProvider } from './components/context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainEvents from './components/MainEvents';
import EventPage from './components/Event';
import ChallengesPage from './components/Challenges';
import ChallengePage from './components/Challenge';

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
            {/* TODO add other routes */}
            <Route path='*' element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
