import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './components/context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainEvents from './components/MainEvents';

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
            {/* TODO add other routes */}
            <Route path='*' element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
