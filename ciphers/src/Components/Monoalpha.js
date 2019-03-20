import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'

class Monoalpha extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.monoalphabetic_cipher = this.monoalphabetic_cipher.bind(this);
  }

  handleChange(event){
    var input = document.getElementById("monoalpha-input").value;
    var keyword = document.getElementById("monoalpha-keyword").value;
    if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
      ReactDOM.render(
        <p>{this.monoalphabetic_cipher(keyword,input)}</p>,
        document.getElementById('monoalpha-output')
      );
    }
    else{
      ReactDOM.render(
        <p/>,
        document.getElementById('monoalpha-output')
      );
    }
  }

  monoalphabetic_cipher(keyword, text){
    var reg_alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var new_alpha = get_new_alphabet(keyword);
    text = text.toUpperCase();
    for(var i=0; i<text.length; i++){
      text = text.replace(text.charAt(i), new_alpha.charAt(reg_alpha.indexOf(text.charAt(i))));
    }
    return text;
  }

  render() {
    return (
      <Container>
        <h1 className="center">Monoalphabetic Cipher</h1>
        <Form>
          <Form.Group controlId="monoalpha-keyword">
            <Form.Label>Keyword:</Form.Label>
            <Form.Control type="keyword" onChange={this.handleChange} placeholder="Enter keyword"/>
            <Form.Text className="text-muted">
              Keyword is needed!
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="monoalpha-input">
            <Form.Label/>
            <Form.Control as="textarea" rows="3" onChange={this.handleChange} placeholder="Enter Text"/>
            <Form.Text className="text-muted">
              Any characters that are not alphabetical will be ignored and unchanged!
            </Form.Text>
          </Form.Group>
        </Form>
        <Jumbotron>
          <h2 className="center">Output</h2>
          <div id="monoalpha-output"/>
        </Jumbotron>
      </Container>
    );
  }
}

function get_new_alphabet(keyword){
    var letters = keyword.toLowerCase().match(/[a-z]/g); //ignore any other characters beside a-z.
    var reg_alpha = "abcdefghijklmnopqrstuvwxyz";
    var new_alpha = "";
    var i = 0;

    if(letters){
      while (i < letters.length && new_alpha.length !== 26) {
        if(new_alpha.indexOf(letters[i]) < 0) {
          new_alpha += letters[i];
          reg_alpha = reg_alpha.replace(letters[i], "");
        }
        i++;
      }
      if(new_alpha.length < 26) new_alpha += reg_alpha; //Fill rest of new alphabet with remaining letters.
    }
    else{
      new_alpha = reg_alpha;
    }
    return new_alpha;
}

export {get_new_alphabet};
export default Monoalpha;
