// In your App.js or wherever you define your routes
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails'; // Import your PokemonDetails component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-details/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
