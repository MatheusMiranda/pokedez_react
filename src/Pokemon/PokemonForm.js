import React from 'react';
import axios from 'axios';
import { API_PATH, SERVER_PATH } from './utils.js';
import { Button, Modal, Form } from 'react-bootstrap'

class PokemonForm extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			id: 0,
			name: "",
			types: [],
			evolutions: [],
			available_types: ["poison", "grass", "flying", "fire", "water", "bug",
												"normal", "electric", "ground", "fairy", "fighting",
												"psychic", "rock", "ice", "ghost", "steel", "dragon"],
      selectedPokemonFiles: [],
			show: this.props.show
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleMultiple = this.handleMultiple.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
		let is_update = this.props.is_update;
		if (is_update && (Object.keys(this.props.pokemon)).length){
      let full_url = SERVER_PATH + this.props.pokemon.photo.url;
      this.props.pokemon.photo.url = full_url;
			this.setState({id: this.props.pokemon.id});
			this.setState({name: this.props.pokemon.name});
			this.setState({types: this.props.pokemon.types});
			this.setState({evolutions: this.props.pokemon.evolutions[0]});
      this.setState({selectedPokemonFiles: [this.props.pokemon.photo]});
		}
	}

	componentDidMount () {
	}

	validateTypes(){
		if (this.props.pokemon.types !== undefined)
			return (this.props.pokemon.types).join();
		else
			return "";
	}

  buildFormData() {
    let formData = new FormData();
    formData.append('pokemon[name]', this.state.name);
    formData.append('pokemon[description]', this.state.types);
    formData.append('pokemon[evolutions]', this.state.evolutions.split(','));

    let { selectedPokemonFiles} = this.state;
    for (let i = 0; i < selectedPokemonFiles.length; i++) {
      let file = selectedPokemonFiles[i];
      if (file.id) {
        if (file._destroy) {
          formData.append(`pokemon[id]`, file.id);
          formData.append(`pokemon[_destroy]`, '1');
        }
      } else {
        formData.append(
          `pokemon[photo]`,
          file,
          file.name
        );
      }
    }

    return formData;
  }

	handleClick() {
		let is_update = this.props.is_update;

		if(is_update){
			axios.put(API_PATH + '/pokemons/' + this.state.id, this.buildFormData())
		}else{
			axios.post(API_PATH + '/pokemons/', this.buildFormData())
		}

		this.handleClose();
	}

	createTypeSelection() {
		return this.state.available_types.map(
			(type, index) =>  <option key={type + index} value={type}>{type}</option>
		);
	}	

	handleMultiple(event) {
		this.setState({types: Array.from(event.target.selectedOptions, (item) => item.value)})
	}

  handleBookCoversChange() {
    let selectedFiles = this.bookCoversField.files;
    let selectedPokemonFiles = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedPokemonFiles.push(selectedFiles.item(i));
    } //end for

    this.setState(
      {
        selectedPokemonFiles: selectedPokemonFiles
      },
      () => {
        this.bookCoversField.value = null;
      }
    );
  }

  renderUploadCoversButton() {
    return (
      <div>
        <input
          name="covers[]"
          ref={field => (this.bookCoversField = field)}
          type="file"
          disabled={this.state.isSubmittingForm}
          accept="image/*"
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
          }}
          id="book_covers"
          onChange={e => this.handleBookCoversChange(e)}
          className="form-control"
        />
        <label
          disabled={this.state.isSubmittingForm}
          className="btn btn-success"
          htmlFor="book_covers">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp;
          {'Upload Image'}
        </label>
      </div>
    );
  }

  renderSelectedBookCoverFiles() {
    let fileDOMs = this.state.selectedPokemonFiles.map((el, index) => {
      if (el._destroy) {
        return null;
      }

      return (
        <div>
          <div className="photo">
            <img
              width={150}
              src={el.id ? el.url : URL.createObjectURL(el)}
              style={{ alignSelf: 'center' }}
            />
            <div
              className="remove"
              onClick={() => this.removeSelectedBookCoverFile(el, index)}>
              <span style={{ top: 2 }} className="glyphicon glyphicon-remove" />
            </div>
          </div>
          <div className="file-name">
            {el.name}
          </div>
        </div>
      );
    });

    return (
      <div>
        {fileDOMs}
      </div>
    );
  }

	getModalTitle() {
		if (this.props.is_update) {
			return "Update Pokemon";
		} else {
			return "Create Pokemon";
		}
	}

	render() {
		return (
			<div>

			<Modal show={this.state.show} onHide={this.handleClose}>
			<Modal.Header closeButton>
			<Modal.Title>{this.getModalTitle()}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
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
						<Form.Label>Add Pokemon image</Form.Label>
      	    {this.renderUploadCoversButton()}
      	    {this.renderSelectedBookCoverFiles()}
				</Form.Group>
				</Form>
			
			</Modal.Body>
			<Modal.Footer>
			<Button variant="secondary" onClick={this.handleClose}>
			Close
			</Button>
			<Button variant="primary" onClick={this.handleClick} type="submit">Salvar</Button>
			</Modal.Footer>
			</Modal>


			</div>
		);
	}
}

export default PokemonForm;
