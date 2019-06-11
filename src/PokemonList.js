import React from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard.js'
import { Row, Col, Container } from 'react-bootstrap'

class PokemonList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemons: []
		};
	}

	componentDidMount() {
		axios.get(`http://localhost:3000/pokemons`)
		.then(res => {
			console.log(res.data);
			this.setState({pokemons: res.data});
		})
	}

	showPokemonList(){
    let pokemons = this.state.pokemons.map(
      (pokemon, index) => 
        <Col> <PokemonCard key={pokemon.name + index} pokemon={pokemon} /> </Col>
    );

		return pokemons;
  }	

	render() {
		return (
			<Container>
				<Row>
			  	{this.showPokemonList()}
				</Row>
			</Container>
		);
	}
}

export default PokemonList;
