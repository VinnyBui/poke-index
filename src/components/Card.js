import React from 'react'

function Card({ pokemon }) {
  return (
    <div>
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={pokemon.sprites.front_default} alt="pokemon"/></figure>
        <div className="card-body">
            <h2 className="card-title">
            {pokemon.name}
            </h2>
            <div className='flex'>
                <p>Weight</p>
                <p>{pokemon.weight}</p>
                <p>Height</p>
                <p>{pokemon.height}</p>
                <p>Ability</p>
                <p>{pokemon.abilities[0].ability.name}</p>
            </div>
            <div className="card-actions justify-end">
                {pokemon.types.map(type => {
                    return (
                        <div className="badge badge-outline">
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

