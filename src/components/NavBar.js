import React from 'react'
import '../styles/navBar.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = (props) => {

  const lookFor= React.useRef()

  const handleInput = () => {
    const currentValue = lookFor.current.value.toLowerCase()
    const results = props.pokemonList.pokemons
      .filter(pokemon => pokemon.name.startsWith(currentValue))
      .map(pokemon => (
        pokemon = pokemon.url.substring(34, pokemon.url.length - 1)
      ))
    const allCards = document.getElementsByClassName('pokemon-card')
    Array.from(allCards).forEach(card => {
      if (results.includes(card.id)) {
        if (card.classList.contains('hide-card')) {
          card.classList.remove('hide-card')
        }
      } else {
        card.classList.add('hide-card')
      }
    })
  }
  
  return(
    <div className='nav-bar'>
      <div className='main-nav'>
        <Link to ='/' style={{ textDecoration: 'none' }}>
          <div className='brand-name'>
             PokéApp
          </div>
        </Link>
        <Link to ='/pokemon-list' style={{ textDecoration: 'none' }}>
          <div className='nav-item'>
              Pokemons
          </div>
        </Link>
      </div>
      <div>
       <input className='search-box' type="search" placeholder="Search" autoComplete='on' ref={lookFor} onChange={handleInput}/>
      </div>
    </div>
    )
}

export default connect((state) => {
  return state
})(NavBar)