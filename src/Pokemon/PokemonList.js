import React from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard.js'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_PATH } from './utils.js';
import Form from 'react-bootstrap/Form';
import { Navbar, Nav } from 'react-bootstrap'
import PokemonForm from './PokemonForm.js'

class PokemonList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			pokemons: [],
			search_pattern: "",
      filtered_pokemons: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.showPokemonModal = this.showPokemonModal.bind(this);
	}

	handleChange(event) {
    let search_pattern = event.target.value;
		let result = (this.state.pokemons).filter(
      (pokemon) => {
        return pokemon.name.includes(search_pattern);
      }
    );
    this.setState({filtered_pokemons: result});
	}

	componentDidMount() {
		axios.get(API_PATH + `/pokemons/`)
		.then(res => {
			this.setState({pokemons: res.data});
			this.setState({filtered_pokemons: res.data});
		})
	}

	showPokemonList(){
    let pokemons = this.state.filtered_pokemons.map(
      (pokemon, index) => 
        <Col style={{marginBottom: '10px'}}key={pokemon.name + index}> <Link className="nav-link" style={{color: 'black'}} to={`pokemon/${pokemon.id}`}><PokemonCard pokemon={pokemon} /> </Link> </Col>
    );

		return pokemons;
  }	

  showPokemonModal(){
    this.refs.pokemonModal.handleShow();
  }

	render() {
    let navbarStyle = {
      marginBottom: '30px'
    }

		return (
      <div>
      <PokemonForm ref= "pokemonModal" is_update={false}>
      </PokemonForm>
      <Navbar bg="light" expand="lg" style={navbarStyle}>
      <Navbar.Brand>Pokedez</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <Nav.Link onClick={this.showPokemonModal}>
      Create Pokemon
      </Nav.Link>
      </Nav>
      <Form inline>
			<Form.Control type="text" placeholder="Ex: charmander" className="mr-sm-2" onChange={(e) => this.handleChange(e)}/>
      </Form>
      </Navbar.Collapse>
      </Navbar>

			<Container>

			{this.state.search_pattern}

			<Row>
				{this.showPokemonList()}
			</Row>

			</Container>

      </div>
		);
	}
}

export default PokemonList;
