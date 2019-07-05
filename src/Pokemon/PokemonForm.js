import React from 'react';
import axios from 'axios';
import { API_PATH, SERVER_PATH } from './utils.js';
import { Button, Modal, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class PokemonForm extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			id: 0,
			name: "",
			types: [],
			evolutions: "",
			available_types: ["poison", "grass", "flying", "fire", "water", "bug",
												"normal", "electric", "ground", "fairy", "fighting",
												"psychic", "rock", "ice", "ghost", "steel", "dragon"],
      selectedPokemonFiles: [],
			show: this.props.show,
			redirectToHome: false,
			pokemonShowUrl: ""
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
			let evolutions = [];
		
			let evolutions_array = this.props.pokemon.evolutions[0];

			if (evolutions_array !== undefined){
				for (var i = 0; i < evolutions_array.length; i++) {
					evolutions.push(evolutions_array[i]['name'])
				}
			}

      this.props.pokemon.photo.url = full_url;
			this.setState({id: this.props.pokemon.id});
			this.setState({name: this.props.pokemon.name});
			this.setState({types: this.props.pokemon.types});
			this.setState({evolutions: evolutions.join()});
      this.setState({selectedPokemonFiles: [this.props.pokemon.photo]});
		}
	}

	componentDidMount () {
	}

  buildFormData() {
    let formData = new FormData();
    formData.append('pokemon[name]', this.state.name);

		let evolutions = []
		if (this.state.evolutions !== ""){
			evolutions = this.state.evolutions.split(',')
		}

    for (var i = 0; i < evolutions.length; i++) {
      formData.append('pokemon[evolutions][]', evolutions[i].trim());
    }

    let types = this.state.types;
    for (var j = 0; j < types.length; j++) {
      formData.append('pokemon[types][]', types[j]);
    }

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

	setRequestFinished(response){
		if (response.status === 200) {
			this.setState({ redirectToHome: true });
		}
	}

	setPokemonShowUrl(response){
		if (response.status === 200) {
			this.setState({ pokemonShowUrl: "/pokemon/" + response.data.id });
		}
	}

	handleClick() {
		let is_update = this.props.is_update;

		let formData = this.buildFormData();

		let isValidForm = (formData.get('pokemon[name]') !== "" &&
											(formData.get('pokemon[photo]') !== null ||
											this.state.selectedPokemonFiles.length !== 0))

		if (isValidForm){
			if(is_update){
				axios.put(API_PATH + '/pokemons/' + this.state.id, formData)
				.then(response => {
					this.setRequestFinished(response)
				})
			}else{
				axios.post(API_PATH + '/pokemons/', formData)
				.then(response => {
					this.setPokemonShowUrl(response)
				})
			}
			this.handleClose();
		}else{
			alert("The fields 'name' and 'photo' can't be empty!")
		}
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
        <div key={"image" + index}>
          <div className="photo">
            <img
              width={150}
              src={el.id ? el.url : URL.createObjectURL(el)}
              style={{ alignSelf: 'center' }}
              alt="pokemon-avatar"
            />
          </div>
          <div key={"image-name" + index} className="file-name">
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
		if (this.state.redirectToHome) {
			return <Redirect to = {{ pathname: "/" }} />;
		}

		if (this.state.pokemonShowUrl !== "") {
			return <Redirect to = {{ pathname: this.state.pokemonShowUrl }} />;
		}

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
						<Form.Control value={this.state.evolutions} type="text" placeholder="Ex: charmilion" onChange={(e) => this.setState({evolutions: e.target.value})}/>
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
			<Button variant="primary" onClick={this.handleClick} type="submit">Save</Button>
			</Modal.Footer>
			</Modal>

			</div>
		);
	}
}

export default PokemonForm;
