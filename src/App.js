import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom'
import store from './redux/store'
import NavBar from './components/NavBar'
import PokemonList from './components/PokemonList'
import InfoModal from './components/InfoModal'
import ComparisonModal from './components/ComparisonModal';
import Home from './components/Home'

function App() {
  return (
    <HashRouter>
      <Provider store={ store }>
        <InfoModal />
        <ComparisonModal/>
        <Route path='/' exact component = {Home}/>
        <Route path='/pokemon-list' component = {NavBar}/>
        <Route path='/pokemon-list' component = {PokemonList}/> 
      </Provider> 
    </HashRouter>
  );
}

export default App;
