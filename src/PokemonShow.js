import React from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard.js'

class PokemonList extends React.Component {
	componentDidMount() {
		axios.get(`http://localhost:3000/pokemons/` + this.props.pokemon.id)
		.then(res => {
			console.log(res.data);
			this.setState({pokemons: res.data});
		})
	}

	showPokemonList(){
    let pokemons = this.state.pokemons.map(
      (pokemon, index) => 
        <PokemonCard key={pokemon.name + index} pokemon={pokemon} />
    );

		return pokemons;
  }	

	render() {
		return (
			<div>
			  {this.showPokemonList()}
			</div>
		);
	}
}

export default PokemonList;
