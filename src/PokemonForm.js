import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class PokemonForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "sdfsdf",
			types: [],
			evolutions: [],
			available_types: ["poison", "grass", "flying", "fire", "water", "bug",
													 "normal", "electric", "ground", "fairy", "fighting",
													 "psychic", "rock", "ice", "ghost", "steel", "dragon"]
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleMultiple = this.handleMultiple.bind(this);
	}

	validateTypes(){
		if (this.props.pokemon.types != undefined)
			return (this.props.pokemon.types).join();
		else
			return "";
	}

	handleClick() {
		console.log("DEu bom", this.state.types);
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
					<Form.Control type="text" placeholder="Ex: charmander" onChange={(e) => this.setState({name: e.target.value})}/>
					<Form.Label>Select Types</Form.Label>

					<Form.Control as="select" multiple onChange={this.handleMultiple}>
						{this.createTypeSelection()}
					</Form.Control>

					<Form.Label>Evolutions</Form.Label>
					<Form.Control type="text" placeholder="Ex: charmilion, charizard" onChange={(e) => this.setState({evolutions: e.target.value})}/>
			</Form.Group>
			</Form>
			<button onClick={this.handleClick} type="salvar">Button</button>
			</div>
		);
	}
}

export default PokemonForm;
