import React from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard.js'
import { API_PATH } from './utils.js';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

class PokemonShow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemon: {}
		};

		this.handleDeleteClick = this.handleDeleteClick.bind(this);
	}

	handleDeleteClick() {
		axios.delete(API_PATH + '/pokemons/' + this.state.pokemon.id)
	}

  get_evolutions() {
    let evolutions = this.state.pokemon.evolutions;
    if (evolutions !== undefined) {
      return evolutions.map(
        (gen, gen_index) => <Row key={gen_index + "gen"}> {gen.map(
          (evolution, index) => <Col key={index + "evolution"}> <PokemonCard pokemon={evolution} /> </Col>
        )} </Row>
      )
    }
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
			<Button onClick={this.handleDeleteClick}>Deletar Pokemon</Button>
      <Link to={{ pathname: '/create_pokemon',
                  state: {is_update: true, pokemon: this.state.pokemon}
      }}>
			  <Button>Editar Pokemon</Button>
      </Link>
			<PokemonCard pokemon={this.state.pokemon} />
      {this.get_evolutions()}
			</div>
		);
	}
}

export default PokemonShow;
