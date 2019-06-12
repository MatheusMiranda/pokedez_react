import React from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard.js'

class PokemonShow extends React.Component {
	componentDidMount() {
    const { params } = this.props.match
		axios.get(`http://localhost:3000/pokemons/` + params.id)
		.then(res => {
			console.log(res.data);
			this.setState({pokemons: res.data});
		})
	}

	render() {
		return (
			<div>
      fdsafdsafd
			</div>
		);
	}
}

export default PokemonShow;
