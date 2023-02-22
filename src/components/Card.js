import React from 'react'

function Card({ pokemon }) {
  return (
    <div>
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={pokemon.sprites.front_default} alt="pokemon"/></figure>
        <div className="card-body">
            <h2 className="card-title font-extrabold">
            {pokemon.name}
            </h2>
            <div className='flex'>
                <p className='font-bold'>Weight</p>
                <p className='font-semibold'>{pokemon.weight}</p>
                <p className='font-bold'>Height</p>
                <p className='font-semibold'>{pokemon.height}</p>
                <p className='font-bold'>Ability</p>
                <p className='font-semibold'>{pokemon.abilities[0].ability.name}</p>
            </div>
            <div className="card-actions justify-end">
                {pokemon.types.map(type => {
                    return (
                        <div className="badge badge-outline font-semibold">
                            {type.type.name}
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
    </div>
  );
}

export default Card;

