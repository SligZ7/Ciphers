import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {shift} from './Caesar'

class Vigenere extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.get_new_alphabets = this.get_new_alphabets.bind(this);
    this.vigenere_cipher = this.vigenere_cipher.bind(this);
  }

  handleChange(event){
    var input = document.getElementById("vigenere-input").value;
    var keyword = document.getElementById("vigenere-keyword").value;
    if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
      ReactDOM.render(
        <p>{this.vigenere_cipher(keyword,input)}</p>,
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

  get_new_alphabets(keyword){
    var letters = keyword.toLowerCase().match(/[a-z]/g); //ignore any other characters beside a-z.
    var reg_alpha = "abcdefghijklmnopqrstuvwxyz";
    var new_alphabets = [];
    if(letters){
      for(var i=0; i<letters.length; i++){
        new_alphabets.push(shift(reg_alpha, reg_alpha.indexOf(letters[i])));
      }
    }
    console.log(new_alphabets);
    return new_alphabets;
  }

  vigenere_cipher(keyword, text){
    var reg_alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var new_alphas = this.get_new_alphabets(keyword);
    text = text.toUpperCase();
    var pos = 0;
    for(var i=0; i<text.length; i++){
      text = text.replace(text.charAt(i), new_alphas[pos].charAt(reg_alpha.indexOf(text.charAt(i))));
      ((pos + 1) < new_alphas.length) ? pos++ : pos = 0;
    }
    return text;
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
              Any characters that are not alphabetical will be ignored!
            </Form.Text>
          </Form.Group>
        </Form>
        <Jumbotron>
          <h2 className="center">Output</h2>
          <div id="vigenere-output"/>
        </Jumbotron>
      </Container>
    );
  }
}

export default Vigenere;
