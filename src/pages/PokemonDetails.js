import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StatProgressBar = ({ label, value, maxValue }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="mb-2 flex justify-between items-center">
    <div className="flex items-center w-60 space-x-4">
      <span className="inline-block w-20">{label}:</span>
      <span className="ml-2">{value}</span>
      <div className="bg-gray-200 h-2 rounded-md flex-grow">
        <div
          className="bg-blue-500 h-2 rounded-md"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  </div>
);
};

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Pokemon Details:', data);

        setPokemonDetails(data);
      } catch (error) {
        console.error('Error fetching detailed Pokemon data:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemonDetails) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  const { stats, sprites } = pokemonDetails;

  return (
    <div className="flex justify-center items-center h-screen ml-72">
      <div className="flex mx-auto w-11/12">
        <img className="w-64 h-64" src={sprites.front_default} alt={`Pokemon ${id}`} />
        <div className="flex flex-col ml-4">
          <h2 className="text-xl font-bold mb-2">Stats:</h2>
          <div>
            {stats.map((stat, index) => (
              <StatProgressBar key={index} label={stat.stat.name} value={stat.base_stat} maxValue={200} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
