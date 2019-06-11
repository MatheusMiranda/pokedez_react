import React from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonList from './PokemonList.js'

function App() {
  return (
    <div className="App">
			<div>header </div>
      <PokemonList> </PokemonList>
			<div>footer </div>
    </div>
  );
}

export default App;
