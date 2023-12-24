import React, { useState, useEffect } from 'react';

const PokemonCard = ({ pokemon }) => {
  const { name, id, sprites } = pokemon;

  return (
    <div className='pokemon-card'>
      <h3>{name}</h3>
      <p>ID: {id}</p>
      <img src={sprites.front_default} alt={name} />
    </div>
  );
};

const ApiCaller = () => {
  const [inputValue, setInputValue] = useState('');
  const [apiData, setApiData] = useState(null);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`);
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (inputValue.trim() !== '') {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    if (apiData) {
      setPokemon(apiData);
    }
  }, [apiData]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={inputValue}
        onChange={handleInputChange}
        className='border border-black'
      />
      {pokemon && (
        <div>
          <h2>Pokemon Name:</h2>
          <PokemonCard pokemon={pokemon} />
        </div>
      )}
    </div>
  );
};

export default ApiCaller;
