import React from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ pokemon, handleOpenModal }) => {
  const navigate = useNavigate();

  const handleOpenModalAndNavigate = () => {
    handleOpenModal(pokemon);
    navigate(`/pokemon-details/${pokemon.id}`);
  };

  return (
    <div className="border p-1 m-1 rounded-md shadow-md w-[200px] bg-white transition duration-300 ease-in-out hover:shadow-black">
      <p className="text-xl font-bold text-center text-indigo-800">{pokemon.name}</p>
      <p className="text-gray-500 text-center">ID: {pokemon.id}</p>
      <p className="text-blue-500 text-center">Type: {pokemon.type}</p>
      <img className="mt-2 mx-auto" src={pokemon.image} alt={pokemon.name} />
      <button
        className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300"
        onClick={handleOpenModalAndNavigate}
      >
        Click to Open
      </button>
    </div>
  );
};

export default PokemonCard;
