import React from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard.js'
import { API_PATH } from './utils.js';
import Button from 'react-bootstrap/Button'
import { Row, Col, Container } from 'react-bootstrap'
import PokemonForm from './PokemonForm.js'
import { Link } from 'react-router-dom'

class PokemonShow extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			pokemon: {}
		};

		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.showPokemonModal = this.showPokemonModal.bind(this);
	}

	handleDeleteClick() {
		axios.delete(API_PATH + '/pokemons/' + this.state.pokemon.id)
		.then(res => {
      this.props.history.push('/');
		})
	}

  get_evolutions() {
    let evolutions = this.state.pokemon.evolutions;
    if (evolutions !== undefined) {
      return evolutions.map(
        (gen, gen_index) => <Row style={{marginTop: '30px'}} key={gen_index + "gen"}> {gen.map(
          (evolution, index) => <Col key={index + "evolution"}>  <Link target="_blank" className="nav-link" style={{color: 'black'}} to={`/pokemon/${evolution.id}`}> <PokemonCard pokemon={evolution} /> </Link> </Col>
        )} </Row>
      )
    }
  }

	componentDidMount() {
    const { params } = this.props.match
		axios.get(API_PATH + `/pokemons/` + params.id)
		.then(res => {
			this.setState({pokemon: res.data});
		})
	}

  showPokemonModal(){
    this.refs.pokemonModal.handleShow();
  }

	render() {
		return (
			<Container>
        <PokemonForm ref="pokemonModal" pokemon={this.state.pokemon} is_update={true}>
        </PokemonForm>
        <Row style={{marginTop: '25px'}}>
        <Col>
			  <PokemonCard pokemon={this.state.pokemon} />
        </Col>
        <Col>
			    <Button variant="success" style={{marginRight: '10px'}} onClick={this.showPokemonModal}>Editar Pokemon</Button>
			    <Button variant="danger" onClick={this.handleDeleteClick}>Deletar Pokemon</Button>
        </Col>
				<Col>
				</Col>
        </Row>
				<Row>
					<Link className="nav-link" to={`/`}>
						<Button variant="secondary">Go Back</Button>
					</Link>
				</Row>
        {this.get_evolutions()}
			</Container>
		);
	}
}

export default PokemonShow;
