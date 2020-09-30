import React, { useEffect}  from 'react'
import '../styles/main.css'
import '../styles/navBar.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { lookFor } from '../redux/actions/lookForActions'

const NavBar = (props) => {
  
  const lookFor= React.useRef()

  useEffect(() => {
    if (!props.pokemonList.isFetching) {
      props.lookFor(props.pokemonList.pokemons)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pokemonList.isFetching]);

  const handleInput = () => {
    const currentValue = lookFor.current.value.toLowerCase()
    const results = props.pokemonList.pokemons
      .filter(pokemon => pokemon.name.startsWith(currentValue))
    props.lookFor(results)
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

const mapDispatchToProps = (dispatch) => {
  return {
    lookFor: (pokemonResults) => dispatch(lookFor(pokemonResults))
  }
}

export default connect((state) => {
  return state
}, mapDispatchToProps)(NavBar)