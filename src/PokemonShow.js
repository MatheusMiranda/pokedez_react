import React from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard.js'
import { API_PATH } from './utils.js';


class PokemonShow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemon: {}
		};
	}

	componentDidMount() {
    const { params } = this.props.match
		axios.get(API_PATH + `/pokemons/` + params.id)
		.then(res => {
			console.log(res.data);
			this.setState({pokemon: res.data});
		})
	}

	render() {
		return (
			<div>
			{this.state.pokemon.name}
			<PokemonCard pokemon={this.state.pokemon} />
			</div>
		);
	}
}

export default PokemonShow;
