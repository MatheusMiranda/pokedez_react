import React from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard.js'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_PATH } from './utils.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Navbar, Nav } from 'react-bootstrap'
import PokemonForm from './PokemonForm.js'

class PokemonList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemons: [],
			search_pattern: "",
      show_pokemon_modal: false
		};

		this.handleClick = this.handleClick.bind(this);
		this.showPokemonModal = this.showPokemonModal.bind(this);
	}

	handleClick() {
		axios.get(API_PATH + '/pokemons?filter=' + this.state.search_pattern)
		.then(res => {
			this.setState({pokemons: res.data});
		})
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
        <Col style={{marginBottom: '10px'}}key={pokemon.name + index}> <Link className="nav-link" style={{color: 'black'}} to={`pokemon/${pokemon.id}`}><PokemonCard pokemon={pokemon} /> </Link> </Col>
    );

		return pokemons;
  }	

  showPokemonModal(){
    this.showModal();
  }

  PokemonModalRef = ({handleShow}) => {
     this.showModal = handleShow;
  }

	render() {
    let navbarStyle = {
      marginBottom: '30px'
    }

		return (
      <div>
      <PokemonForm ref={this.PokemonModalRef} is_update={false}>
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
			<Form.Control type="text" onSubmit={this.handleClick} placeholder="Ex: charmander" className="mr-sm-2" onChange={(e) => this.setState({search_pattern: e.target.value})}/>
			<Button variant="outline-success" onClick={this.handleClick}>Search</Button>
      </Form>
      </Navbar.Collapse>
      </Navbar>

			<Container>

			<Row>
				{this.showPokemonList()}
			</Row>

			</Container>

      </div>
		);
	}
}

export default PokemonList;
