import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from "axios";
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [currentPageUrl, setcurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setnextPageUrl] = useState();
  const [prevPageUrl, setprevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response)=> {
        console.log(response);
      }
    );
  };

  //useEffects makes it so axios will fetch the data and rerender once, making it more efficient
  //Every time currentPageUrl changes, rerender the data
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setnextPageUrl(res.data.next)
      setprevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    //cancels old request if the user makes a new one
    return () => cancel()
  }, [currentPageUrl]);

  function gotoNextPage() {
    setcurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setcurrentPageUrl(prevPageUrl)
  }

  if(loading) return "Loading..."

  return (
    <>
      <div className="flex flex-col items-center ">
        <header className=" p-14 w-full">
          <h1 className="font-bold text-5xl text-center">Pokedex</h1>
        </header>
        <div className='w-2/3 flex justify-center gap-2'>
          <input
            className='input input-bordered w-full max-w-xs'
            type="text"
            placeholder="Type here"
            onChange={(event) => {
              setPokemonName(event.target.value);
            }}
          />
          <button className="btn" onClick={searchPokemon}>Search Pokemon</button>
        </div>
      </div>
    
      {/* <PokemonList pokemon={pokemon} /> */}
      {/* <Pagination gotoNextPage = {nextPageUrl ? gotoNextPage : null} gotoPrevPage = {prevPageUrl ? gotoPrevPage : null}/> */}
    </>
  );
}

export default App;
