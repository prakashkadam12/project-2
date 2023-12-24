// src/components/PokemonDetailModal.js
import React from 'react';

const PokemonDetailModal = ({ pokemon, handleCloseModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={handleCloseModal}>
          Close
        </button>
        <h2>{pokemon.name}</h2>
        <p>ID: {pokemon.id}</p>
        <p>Type: {pokemon.type}</p>
      </div>
    </div>
  );
};

export default PokemonDetailModal;
