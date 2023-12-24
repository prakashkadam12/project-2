import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import InfiniteScroll from '../components/InfiniteScroll';
import PokemonCard from '../components/PokemonCard';
import PaginationButtons from '../components/PaginationButtons';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); 

  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=500`);
        const data = await response.json();
  
        const fetchedPokemons = await Promise.all(data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            type: pokemonData.types.map((type) => type.type.name).join(', '),
            image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`,
          };
        }));
  
        setPokemons(fetchedPokemons);
        setFilteredPokemons(fetchedPokemons);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAllPokemons();
  }, []);
  
  
  
  

  const cardsPerPage = 3; // Number of cards per page

  const handlePageChange = (newPage) => {
    const startIndex = (newPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    
    setFilteredPokemons(pokemons.slice(startIndex, endIndex));
    setPage(newPage);
  };
  
  useEffect(() => {
    // Fetch types from API or use mock data
    const uniqueTypes = Array.from(new Set(pokemons.map((pokemon) => pokemon.type)));
    setTypes(uniqueTypes);
  }, [pokemons]);

  const handleSearch = (pokemonData) => {
    setFilteredPokemons([pokemonData]); // Display only the searched Pokemon
  };

  const handleTypeChange = async (type) => {
    setSelectedType(type);
  
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
  
      const pokemonsOfType = data.pokemon.map((pokemonData) => ({
        id: pokemonData.pokemon.url.split('/').slice(-2, -1)[0],
        name: pokemonData.pokemon.name,
        type: type,
        image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonData.pokemon.url.split('/').slice(-2, -1)[0]}.svg`,
      }));
  
      setFilteredPokemons(pokemonsOfType);
    } catch (error) {
      console.error('Error fetching Pokémon data by type:', error);
    }
  };
  

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const data = await response.json();
  
        const fetchedTypes = data.results.map((type) => type.name);
        setTypes(fetchedTypes);
      } catch (error) {
        console.error('Error fetching Pokémon types:', error);
      }
    };
  
    fetchTypes();
  }, []);
  

  const handleScroll = () => {
    const { scrollLeft, clientWidth, scrollWidth } = document.getElementById('pokemon-cards-container');

    // Assuming a small buffer of 10 pixels when scrolling to the right
    if (scrollLeft + clientWidth >= scrollWidth - 10 && !loading) {
      loadNextSetOfCards();
    }
  };

  const loadNextSetOfCards = async () => {
    // Assuming 3 cards per page
    const cardsPerPage = 3;
  
    // Set loading state to true
    setLoading(true);
  
    try {
      // Fetch the initial set of Pokemon data starting from ID 1
      const startIndex = (page - 1) * cardsPerPage + 1;
      const endIndex = startIndex + cardsPerPage - 1;
      const specificIds = Array.from({ length: cardsPerPage }, (_, index) => index + startIndex);
  
      const specificCards = await Promise.all(
        specificIds.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();
  
          return {
            id: data.id,
            name: data.name,
            type: data.types.map((type) => type.type.name).join(', '),
            image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`,
          };
        })
      );
  
      // Update the page and set the loading state
      setPage((prevPage) => prevPage + 1);
  
      // Add specific cards to the beginning of the filteredPokemons array
      setFilteredPokemons([...specificCards, ...filteredPokemons]);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  };
  
  
  // ...
  
  // const handleNextButtonClick = () => {
  //   loadNextSetOfCards();
  // };

  useEffect(() => {
    const pokemonCardsContainer = document.getElementById('pokemon-cards-container');
    pokemonCardsContainer.addEventListener('scroll', handleScroll);

    return () => {
      pokemonCardsContainer.removeEventListener('scroll', handleScroll);
    };
  }, [loading, page, filteredPokemons]);

  const filterPokemons = (type, search) => {
    const filtered =
      type || search
        ? pokemons.filter(
            (pokemon) =>
              (!type || pokemon.type === type) &&
              (!search || pokemon.name.toLowerCase().includes(search.toLowerCase()))
          )
        : pokemons;

    setFilteredPokemons(filtered);
  };

  const handleOpenModal = (pokemon) => {
    // Implement logic to open modal with detailed Pokemon information
    console.log('Open modal for:', pokemon);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
    <div className="flex space-x-5 mt-4 overflow-x-hidden">
      <SearchBar handleSearch={handleSearch} />
      <TypeFilter types={types} handleTypeChange={handleTypeChange} />
    </div>
      <div className="mt-15 max-h-[600px] overflow-x-auto">
      <div id="pokemon-cards-container" className="mt-20 max-h-[600px] overflow-x-auto flex">
            {filteredPokemons.map((pokemon, index) => (
              <animated.div style={{ ...springProps, minWidth: '300px' }} key={pokemon.id}>
                <PokemonCard pokemon={pokemon} handleOpenModal={handleOpenModal} />
              </animated.div>
            ))}
        {loading && <p>Loading...</p>}
      </div>
      </div>
      <PaginationButtons
        className="mb-60 "
        currentPage={page}
        totalPages={Math.ceil(pokemons.length / cardsPerPage)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
