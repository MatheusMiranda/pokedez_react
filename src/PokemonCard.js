import React from 'react';

class PokemonCard extends React.Component {
	render() {
		return (
			<div>
			{this.props.pokemon.name}
			<img src={this.props.pokemon.image} />
			{this.props.pokemon.type}
			</div>
		);
	}
}

export default PokemonCard;
