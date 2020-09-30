import React, { useEffect}  from 'react'
import '../styles/main.css'
import '../styles/navBar.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { lookFor } from '../redux/actions/lookForActions'

const NavBar = (props) => {
  
  const inputWord= React.useRef()
  const {lookFor, pokemonList} = props

  useEffect(() => {
    if (!pokemonList.isFetching) {
     lookFor(pokemonList.pokemons)
    }
  }, [pokemonList.isFetching, lookFor, pokemonList.pokemons]);

  const handleInput = () => {
    const currentValue = inputWord.current.value.toLowerCase()
    const results = pokemonList.pokemons
      .filter(pokemon => pokemon.name.startsWith(currentValue))
    lookFor(results)
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
       <input className='search-box' type="search" placeholder="Search" autoComplete='on' ref={inputWord} onChange={handleInput}/>
      </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    lookFor: (pokemonResults) => dispatch(lookFor(pokemonResults))
  }
}

export default connect((state) => {
  return state
}, mapDispatchToProps)(NavBar)