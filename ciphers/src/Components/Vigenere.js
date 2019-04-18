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
    this.state = {mode: 0};
  }

  handleChange(e, mode_change){
    var input = document.getElementById('vigenere-input').value;
    var keyword = document.getElementById('vigenere-keyword').value;
    var mode = this.state.mode;
    if(mode_change) {
      (mode === 0) ? mode = 1 : mode = 0;
    }
    if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
      ReactDOM.render(
        <p>{this.vigenereCipher(keyword,input,mode)}</p>,
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

  render() {
    return (
      <Container>
        <h1 className='center'>Vigenere Cipher</h1>
        <Form>
          <Form.Group controlId='vigenere-keyword'>
            <Form.Label>Keyword:</Form.Label>
            <Form.Control type='keyword' onChange={this.handleChange} placeholder='Enter keyword'/>
            <Form.Text className='text-muted'>
              Keyword is needed!
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='vigenere-input'>
            <Form.Label/>
            <Form.Control as='textarea' rows='3' onChange={this.handleChange} placeholder='Enter Text'/>
            <Form.Text className='text-muted'>
              Any characters that are not alphabetical will be ignored and unchanged!
            </Form.Text>
          </Form.Group>
        </Form>
        <Button id='vigenere-mode' type='button' variant='primary' onClick={this.handleClick}>
          {(this.state.mode === 0) ? 'Encrypt Mode' : 'Decrypt Mode'}
        </Button>
        <br/><br/>
        <Jumbotron>
          <h2 className='center'>Output</h2>
          <div id='vigenere-output'/>
        </Jumbotron>
      </Container>
    );
  }
}

//Performs Vignere substituion.
//  keyword: String of letters used to create new alphabets to perform substituion.
//  text: String to encrypt/decrypt.
//  Mode indicates whether to encrypt or decrypt. 0: Encrypt, 1:Decrypt
//  @Returns:
//    text: Given text that has been substituted based on the keyword given.
/*** Could possibly be more time efficent, but using a hash is likely not the way. ***/
function vigenereCipher(keyword, text, mode=0){
  var newAlphas = getNewAlphabets(keyword);
  var regAlpha = 'abcdefghijklmnopqrstuvwxyz';
  var i;
  var pos = 0;
  if(newAlphas){
    if(mode === 0){
      text = text.toLowerCase();
      for(i=0; i<text.length; i++){
        text = text.replace(text.charAt(i), newAlphas[pos].charAt(regAlpha.indexOf(text.charAt(i))));
        ((pos + 1) < newAlphas.length) ? pos++ : pos = 0;
      }
    }
    else{
      text = text.toUpperCase();
      for(i=0; i<text.length; i++){
        text = text.replace(text.charAt(i), regAlpha.charAt(newAlphas[pos].indexOf(text.charAt(i))));
        ((pos + 1) < newAlphas.length) ? pos++ : pos = 0;
      }
    }
    return text;
  }
}

//Creates new alphabets from keyword to use for monoalphabetic substituion.
//Each new alphabet is constructed by shifting the regular alphabet so that the current letter is the first letter.
//  keyword: String of letters used to create new alphabets to perform substituion.
//  @Returns:
//    newAlphas: An array of strings containing the new alphabets.
function getNewAlphabets(keyword){
  var letters = keyword.toUpperCase().match(/[A-Z]/g); //ignore any other characters beside a-z.
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var newAlphas = [];
  if(letters){
    for(var i=0; i<letters.length; i++){
      newAlphas.push(shift(alpha, alpha.indexOf(letters[i])));
    }
  }
  return newAlphas;
}


export default Vigenere;
