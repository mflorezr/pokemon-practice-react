import React from 'react'
import '../styles/main.css'
import '../styles/home.css'
import title from '../images/title.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return(
    <div className='home'> 
      <div className='backdrop-home'>
        <div className='container-pokemon-title'>
          <img className = 'pokemon-title-image' src={title} alt=""/>
        </div>
        <div className='welcome'> Welcome to Poketionary! </div>
        <p className = 'welcome-description'>
          Know everything you need to know about these awesome creatures 
          of the Pokemon World and choose your best competitor
        </p>
        <Link to='/pokemon-list'>
          <button className='goto-pokemons'> LET'S GO</button>
        </Link>
      </div> 
    </div>
  )
}

export default Home 