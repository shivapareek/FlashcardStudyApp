import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DeckPage from './components/DeckPage';
import StudyMode from './components/StudyMode';
import Header from './components/Header';
import FlipTest from './components/FlipTest';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/deck/:deckId" element={<DeckPage />} />
            <Route path="/study/:deckId" element={<StudyMode />} />
            <Route path="/test-flip" element={<FlipTest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
