import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {shift} from './Caesar'

class Vigenere extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.get_new_alphabets = this.get_new_alphabets.bind(this);
    this.vigenere_cipher = this.vigenere_cipher.bind(this);

    this.state = {mode: 0};
  }

  handleChange(e, mode_change){
    var input = document.getElementById("vigenere-input").value;
    var keyword = document.getElementById("vigenere-keyword").value;
    var mode = this.state.mode;
    if(mode_change) {
      (mode === 0) ? mode = 1 : mode = 0;
    }
    if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
      ReactDOM.render(
        <p>{this.vigenere_cipher(keyword,input,mode)}</p>,
        document.getElementById('vigenere-output')
      );
    }
    else{
      ReactDOM.render(
        <p/>,
        document.getElementById('vigenere-output')
      );
    }
  }

  handleClick(e){
    (this.state.mode === 0) ? this.setState({mode: 1}) : this.setState({mode: 0});
    this.handleChange(e, true)
  }

  get_new_alphabets(keyword){
    var letters = keyword.toUpperCase().match(/[A-Z]/g); //ignore any other characters beside a-z.
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var new_alphas = [];
    if(letters){
      for(var i=0; i<letters.length; i++){
        new_alphas.push(shift(alpha, alpha.indexOf(letters[i])));
      }
    }
    return new_alphas;
  }

  //Mode indicates whether to encrypt or decrypt.
  //  0: Encrypt, 1:Decrypt
  vigenere_cipher(keyword, text, mode=0){
    var new_alphas = this.get_new_alphabets(keyword);
    var reg_alpha = "abcdefghijklmnopqrstuvwxyz";
    var i;
    var pos = 0;
    if(new_alphas){
      if(mode === 0){
        text = text.toLowerCase();
        for(i=0; i<text.length; i++){
          text = text.replace(text.charAt(i), new_alphas[pos].charAt(reg_alpha.indexOf(text.charAt(i))));
          ((pos + 1) < new_alphas.length) ? pos++ : pos = 0;
        }
      }
      else{
        text = text.toUpperCase();
        for(i=0; i<text.length; i++){
          text = text.replace(text.charAt(i), reg_alpha.charAt(new_alphas[pos].indexOf(text.charAt(i))));
          ((pos + 1) < new_alphas.length) ? pos++ : pos = 0;
        }
      }
      return text;
    }
  }

  render() {
    return (
      <Container>
        <h1 className="center">Vigenere Cipher</h1>
        <Form>
          <Form.Group controlId="vigenere-keyword">
            <Form.Label>Keyword:</Form.Label>
            <Form.Control type="keyword" onChange={this.handleChange} placeholder="Enter keyword"/>
            <Form.Text className="text-muted">
              Keyword is needed!
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="vigenere-input">
            <Form.Label/>
            <Form.Control as="textarea" rows="3" onChange={this.handleChange} placeholder="Enter Text"/>
            <Form.Text className="text-muted">
              Any characters that are not alphabetical will be ignored and unchanged!
            </Form.Text>
          </Form.Group>
        </Form>
        <Button id="vigenere-mode" type="button" variant="primary" onClick={this.handleClick}>
          {(this.state.mode === 0) ? "Encrypt Mode" : "Decrypt Mode"}
        </Button>
        <br/><br/>
        <Jumbotron>
          <h2 className="center">Output</h2>
          <div id="vigenere-output"/>
        </Jumbotron>
      </Container>
    );
  }
}

export default Vigenere;
