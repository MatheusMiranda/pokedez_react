import React from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard.js'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_PATH } from './utils.js';

class PokemonList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemons: []
		};
	}

	componentDidMount() {
		axios.get(API_PATH + `/pokemons/`)
		.then(res => {
			console.log(res.data);
			this.setState({pokemons: res.data});
		})
	}

	showPokemonList(){
    let pokemons = this.state.pokemons.map(
      (pokemon, index) => 
        <Col key={pokemon.name + index}> <Link to={`pokemon/${pokemon.id}`}><PokemonCard pokemon={pokemon} /> </Link> </Col>
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
