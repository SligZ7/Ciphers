import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import PlayfairSquare from './PlayfairSquare'
import {get_new_alphabet} from './Monoalpha'

class Playfair extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.keywordChange = this.keywordChange.bind(this);
    this.get_keyword = this.get_keyword.bind(this);
    this.create_square = this.create_square.bind(this);
    this.playfair_cipher = this.playfair_cipher.bind(this);

    this.state = {mode: 0, keyword: ""};
  }

  handleChange(e, mode_change){
    var input = document.getElementById("playfair-input").value;
    var keyword = document.getElementById("playfair-keyword").value;
    var mode = this.state.mode;
    if(mode_change) {
      (mode === 0) ? mode = 1 : mode = 0;
    }
/*
    if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
      ReactDOM.render(
        <PlayfairSquare square={this.create_square(keyword)} read_only={true}/>,
        document.getElementById('playfair-table')
      );
    }
    else{
      ReactDOM.render(
        <PlayfairSquare square={this.create_square("")} read_only={true}/>,
        document.getElementById('playfair-table')
      );
    }*/
  }

  handleClick(e){
    (this.state.mode === 0) ? this.setState({mode: 1}) : this.setState({mode: 0});
    this.handleChange(e, true);
  }

  keywordChange(e){
    this.setState({keyword: e.target.value});
    this.handleChange();
  }

  get_keyword(){
    console.log("render :)");
    return document.getElementById("playfair-keyword").value;
  }


  //Mode indicates whether to encrypt or decrypt.
  //  0: Encrypt, 1:Decrypt
  playfair_cipher(keyword, text, mode=0){

  }

  create_square(keyword, letter_to_replace="j"){
    var i       // the first-order index in square
      , j       // the second order index in square
      , square = [];
    keyword = get_new_alphabet(keyword).replace(letter_to_replace, ""); // Still needs to replace letter with intended replacement when encrypting
    for(i=0; i<5;i++){
      square[i] = [];
      for(j=0; j<5;j++){
        square[i][j] = keyword.charAt(i * 5 + j);
      }
    }
    return square;
  }

  render() {
    return (
      <Container>
        <h1 className="center">Playfair Cipher</h1>
        <Form>
          <Form.Group controlId="playfair-keyword">
            <Form.Label>Keyword:</Form.Label>
            <Form.Control type="keyword" onChange={this.keywordChange} placeholder="Enter keyword"/>
            <Form.Text className="text-muted">
              Keyword is needed!
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="playfair-input">
            <Form.Label/>
            <Form.Control as="textarea" rows="3" onChange={this.handleChange} placeholder="Enter Text"/>
            <Form.Text className="text-muted">
              Any characters that are not alphabetical will be ignored and unchanged!
            </Form.Text>
          </Form.Group>
        </Form>
        <Button id="playfair-mode" type="button" variant="primary" onClick={this.handleClick}>
          {(this.state.mode === 0) ? "Encrypt Mode" : "Decrypt Mode"}
        </Button>
        <br/><br/>
        <h3 className="center">Table Being Used</h3>
        <div id="playfair-table">
          <PlayfairSquare square={this.create_square(this.state.keyword)} read_only={true}/>
        </div>
        <Jumbotron>
          <h2 className="center">Output</h2>
          <div id="playfair-output"/>
        </Jumbotron>
      </Container>
    );
  }
}

export default Playfair;
