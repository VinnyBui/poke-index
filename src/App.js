import React, { useState, useEffect } from 'react';
import axios from "axios";
import { getAllPokemon, getPokemon} from './services/Pokemon';
import Card from './components/Card'
import Navbar from './components/Navbar'

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [searchPokemonData, setsearchPokemonData] = useState({});
  const [pokemonChosen, setPokemonChosen] = useState(false)
  const [currentPageUrl, setcurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setnextPageUrl] = useState('');
  const [prevPageUrl, setprevPageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const searchPokemon = async () => {
    setPokemonChosen(false)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response)=> {
        setsearchPokemonData(response.data);
        if(!pokemonName==""){
          setPokemonChosen(true)
        }
      }
    );

  };

  //useEffects makes it so axios will fetch the data and rerender once, making it more efficient
  //Every time currentPageUrl changes, rerender the data
  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(currentPageUrl);
      setnextPageUrl(response.next);
      setprevPageUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextPageUrl)
    await loadingPokemon(data.results)
    setnextPageUrl(data.next);
    setprevPageUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if(!prevPageUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevPageUrl)
    await loadingPokemon(data.results)
    setnextPageUrl(data.next);
    setprevPageUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
    })
  );
    setPokemonData(_pokemonData);
  };


  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
        ) : (
          <>
            <Navbar setPokemonName={setPokemonName} searchPokemon={searchPokemon} gotoNextPage = {next} gotoPrevPage = {prev}></Navbar>
            <div className='flex flex-wrap gap-2 mt-24 justify-center'>
              {!pokemonChosen ? (pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon}/>
              })) : (<Card pokemon={searchPokemonData}/>)}
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;
