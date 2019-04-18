import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'

class Monoalpha extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    var input = document.getElementById('monoalpha-input').value;
    var keyword = document.getElementById('monoalpha-keyword').value;
    if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
      ReactDOM.render(
        <p>{monoalphabeticCipher(keyword, input)}</p>,
        document.getElementById('monoalpha-output')
      );
    }
    else{
      ReactDOM.render(
        <p />,
        document.getElementById('monoalpha-output')
      );
    }
  }

  render() {
    return (
      <Container>
        <h1 className='center'>Monoalphabetic Cipher</h1>
        <Form>
          <Form.Group controlId='monoalpha-keyword'>
            <Form.Label>Keyword:</Form.Label>
            <Form.Control type='keyword' onChange={this.handleChange} placeholder='Enter keyword'/>
            <Form.Text className='text-muted'>
              Keyword is needed!
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='monoalpha-input'>
            <Form.Label/>
            <Form.Control as='textarea' rows='3' onChange={this.handleChange} placeholder='Enter Text'/>
            <Form.Text className='text-muted'>
              Any characters that are not alphabetical will be ignored and unchanged!
            </Form.Text>
          </Form.Group>
        </Form>
        <Jumbotron>
          <h2 className='center'>Output</h2>
          <div id='monoalpha-output'/>
        </Jumbotron>
      </Container>
    );
  }
}

//Performs monoalphabetic substituion.
//  keyword: String of letters used to create new alphabet to perform substituion.
//  text: String to encrypt/decrypt.
//  @Returns:
//    text: Given text that has been substituted based on the keyword given.

/*** TO DO: Alter function to use hash for greater time efficiency. ***/
function monoalphabeticCipher(keyword, text){
  var regAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var newAlpha = getNewAlphabet(keyword);
  text = text.toUpperCase();
  for(var i=0; i<text.length; i++){
    text = text.replace(text.charAt(i), newAlpha.charAt(regAlpha.indexOf(text.charAt(i))));
  }
  return text;
}

//Creates new alphabet from keyword to use for monoalphabetic substituion.
//New alphabet is constructed removing any repetitions in keyword and adding any missing letters to the end
//in the order they appear in the normal alphabet.
//  keyword: String of letters used to create new alphabetic to perform substituion.
//  @Returns:
//    newAlpha: New alphabet constructed using keyword.
function getNewAlphabet(keyword){
    var letters = keyword.toLowerCase().match(/[a-z]/g); //ignore any other characters beside a-z.
    var regAlpha = 'abcdefghijklmnopqrstuvwxyz';
    var newAlpha = '';
    var i = 0;

    if(letters){
      while (i < letters.length && newAlpha.length !== 26) {
        if(newAlpha.indexOf(letters[i]) < 0) {
          newAlpha += letters[i];
          regAlpha = regAlpha.replace(letters[i], '');
        }
        i++;
      }
      if(newAlpha.length < 26) newAlpha += regAlpha; //Fill rest of new alphabet with remaining letters.
    }
    else{
      newAlpha = regAlpha;
    }
    return newAlpha;
}

export {getNewAlphabet};
export default Monoalpha;
