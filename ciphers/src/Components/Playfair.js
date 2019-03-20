import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import PlayfairSquare from './PlayfairSquare'

class Playfair extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.playfair_cipher = this.playfair_cipher.bind(this);

    this.state = {mode: 0};
  }

  handleChange(e, mode_change=false){
    var input = document.getElementById("playfair-input").value;
    var keyword = document.getElementById("playfair-keyword").value;
    var mode = this.state.mode;
    if(mode_change) {
      (mode === 0) ? mode = 1 : mode = 0;
    }
    
    if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
      ReactDOM.render(
        <PlayfairSquare keyword="abcdefghiklmnopqrstuvwxyz"/>,//<p>{this.playfair_cipher(keyword,input,mode)}</p>,
        document.getElementById('playfair-output')
      );
    }
    else{
      ReactDOM.render(
        <p/>,
        document.getElementById('playfair-output')
      );
    }
  }

  handleClick(e){
    (this.state.mode === 0) ? this.setState({mode: 1}) : this.setState({mode: 0});
    this.handleChange(e, true)
  }


  //Mode indicates whether to encrypt or decrypt.
  //  0: Encrypt, 1:Decrypt
  playfair_cipher(keyword, text, mode=0){
    return
  }

  render() {
    return (
      <Container>
        <h1 className="center">Playfair Cipher</h1>
        <Form>
          <Form.Group controlId="playfair-keyword">
            <Form.Label>Keyword:</Form.Label>
            <Form.Control type="keyword" onChange={this.handleChange} placeholder="Enter keyword"/>
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
        <Jumbotron>
          <h2 className="center">Output</h2>
          <div id="playfair-output"/>
        </Jumbotron>
      </Container>
    );
  }
}

export default Playfair;
