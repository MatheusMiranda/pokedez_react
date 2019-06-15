import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { API_PATH } from './utils.js';

class PokemonForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			name: "",
			types: [],
			evolutions: [],
			available_types: ["poison", "grass", "flying", "fire", "water", "bug",
												"normal", "electric", "ground", "fairy", "fighting",
												"psychic", "rock", "ice", "ghost", "steel", "dragon"]
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleMultiple = this.handleMultiple.bind(this);
	}

	componentDidMount () {
		let is_update = this.props.location.state.is_update;
		if (is_update){
			this.setState({id: this.props.location.state.id});
			this.setState({name: this.props.location.state.name});
			this.setState({types: this.props.location.state.types});
			this.setState({evolutions: this.props.location.state.evolutions});
		}
	}

	validateTypes(){
		if (this.props.pokemon.types !== undefined)
			return (this.props.pokemon.types).join();
		else
			return "";
	}

	handleClick() {
		let is_update = this.props.location.state.is_update;
		let pokemon_data = {name: this.state.name, types: this.state.types,
									 evolutions: this.state.evolutions.split(',')}

		if(is_update){
			axios.put(API_PATH + '/pokemons/' + this.state.id, pokemon_data)
			console.log("Entrou no update")
		}else{
			axios.post(API_PATH + '/pokemons/', pokemon_data)
			console.log("Entrou no post")
		}
	}

	createTypeSelection() {
		return this.state.available_types.map(
			(type) =>  <option value={type}>{type}</option>
		);
	}	

	handleMultiple(event) {
		this.setState({types: Array.from(event.target.selectedOptions, (item) => item.value)})
	}

	render() {
		return (
			<div>
			<Form>
			<Form.Group controlId="exampleForm.ControlInput1">
			<Form.Label>Name</Form.Label>
					<Form.Control value={this.state.name} type="text" placeholder="Ex: charmander" onChange={(e) => this.setState({name: e.target.value})}/>
					<Form.Label>Select Types</Form.Label>

					<Form.Control value={this.state.types} as="select" multiple onChange={this.handleMultiple}>
						{this.createTypeSelection()}
					</Form.Control>

					<Form.Label>Evolutions</Form.Label>
					<Form.Control value={this.state.evolutions} type="text" placeholder="Ex: charmilion, charizard" onChange={(e) => this.setState({evolutions: e.target.value})}/>
			</Form.Group>
			</Form>
			<button onClick={this.handleClick} type="salvar">Button</button>
			</div>
		);
	}
}

export default PokemonForm;
