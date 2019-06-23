import React from 'react';
import Card from 'react-bootstrap/Card'
import { SERVER_PATH } from './utils.js';

class PokemonCard extends React.Component {
  validateTypes(){
    if (this.props.pokemon.types !== undefined)
      return (this.props.pokemon.types).join();
    else
      return "";
  }

  getPokemonImage(){
    if (this.props.pokemon.photo !== undefined)
      return this.props.pokemon.photo.url;
    else
      return "";
  }

	render() {
		return (
			<Card style={{ width: '12rem'}}>
        <Card.Header>
          <Card.Title>{this.props.pokemon.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Img variant="top" src={SERVER_PATH + this.getPokemonImage()} />
        </Card.Body>
         <Card.Footer className="text-muted">
            {this.validateTypes()}
         </Card.Footer>
			</Card>
		);
	}
}

export default PokemonCard;
