import React from 'react';
import Card from 'react-bootstrap/Card'

class PokemonCard extends React.Component {
	render() {
		return (
			<Card style={{ width: '18rem', marginBottom: '10px' }}>
        <Card.Img variant="top" src={this.props.pokemon.image} />
        <Card.Body>
          <Card.Title>{this.props.pokemon.name}</Card.Title>
          <Card.Text>
          {this.props.pokemon.type}
          </Card.Text>
        </Card.Body>
			</Card>
		);
	}
}

export default PokemonCard;
