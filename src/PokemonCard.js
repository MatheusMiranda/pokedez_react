import React from 'react';
import Card from 'react-bootstrap/Card'

class PokemonCard extends React.Component {
  validateTypes(){
    if (this.props.pokemon.types != undefined)
      return (this.props.pokemon.types).join();
    else
      return "";
  }

	render() {
		return (
			<Card style={{ width: '18rem', marginBottom: '10px' }}>
        <Card.Img variant="top" src="https://picsum.photos/200" />
        <Card.Body>
          <Card.Title>{this.props.pokemon.name}</Card.Title>
          <Card.Text>
            {this.validateTypes()}
          </Card.Text>
        </Card.Body>
			</Card>
		);
	}
}

export default PokemonCard;
