import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

class Monoalpha extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.get_new_alphabet = this.get_new_alphabet.bind(this);
  }

  handleChange(event){
    //ReactDOM.render(
      //<Shifts shifts={this.(event.target.value)}/>, //NEED TO CHANGE
      //document.getElementById('monoalpha-output')
    //);
  }

  get_new_alphabet(keyword){
      var letters = keyword.toLowerCase().match(/[a-z]/g); //ignore any other characters beside a-z.
      var reg_alpha = "abcdefghijklmnopqrstuvwxyz";
      var new_alpha = "";
      var i = 0;

      if(!letters){
        while (i < letters.length && new_alpha.length != 26) {
          if(new_alpha.indexOf(letters[i]) < 0) {
            new_alpha += letters[i];
            reg_alpha.replace(letters[i], "");
          }
          i++;
        }
        if(new_alpha.length < 26) new_alpha += reg_alpha; //Fill rest of new alphabet with remaining letters.
      }
      return new_alpha;
  }

  render() {
    return (
      <Container>
        <h1 className="center">Monoalphabetic Cipher</h1>
        <Form>
          <Form.Group controlId="monoalpha-keyword">
            <Form.Label>Keyword:</Form.Label>
            <Form.Control type="email" placeholder="Enter keyword" />
            <Form.Text className="text-muted">
              Keyword is needed!
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="monoalpha-input">
            <Form.Label/>
            <Form.Control as="textarea" rows="3" onChange={this.handleChange} placeholder="Enter Text"/>
            <Form.Text className="text-muted">
              Any characters that are not alphabetical will be ignored!
            </Form.Text>
          </Form.Group>
        </Form>

        <div id="monoalpha-output"/>
      </Container>
    );
  }
}

export default Monoalpha;
