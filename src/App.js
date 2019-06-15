import React from 'react';
import './App.css';
import PokemonList from './PokemonList.js'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function App() {
  return (
    <div className="App">
      <Link to={{ pathname: '/create_pokemon',
                  state: {is_update: false}
      }}>
      <Button type="link">
      Cadastrar Pokemon
      </Button>
      </Link>
      <PokemonList> </PokemonList>
    </div>
  );
}

export default App;
