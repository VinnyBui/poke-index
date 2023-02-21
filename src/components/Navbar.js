import React from 'react'

export default function Navbar({ setPokemonName, searchPokemon, gotoNextPage, gotoPrevPage}) {
  return (
    <div className="flex flex-col items-center gap-5">
        <header className="mt-20 mb-10 w-full">
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
        <div className='flex gap-2'>
              <button className='btn btn-outline btn-info' onClick={gotoPrevPage}>Prev</button>
              <button className='btn btn-outline btn-info' onClick={gotoNextPage}>Next</button>
        </div>
    </div>
  )
}
