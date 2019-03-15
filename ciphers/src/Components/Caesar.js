import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Shifts from './Shifts'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

class Caesar extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.caesar_shift = this.caesar_shift.bind(this);
    this.get_shifts = this.get_shifts.bind(this);
  }

  handleChange(event){
    ReactDOM.render(
      <Shifts shifts={this.get_shifts(event.target.value)}/>,
      document.getElementById('caesar-output')
    );
  }

  get_shifts(input){
    var shifts = [];
    for(var i=1; i<26; i++){
      shifts.push(this.caesar_shift(input, i));
    }
    return shifts;
  }

  caesar_shift(str, shift_num){
    str = str.toLowerCase();
    var alpha = "abcdefghijklmnopqrstuvwxyz";
    var shift = "";
    for(var i=0; i<str.length; i++){
      var pos = alpha.indexOf(str.charAt(i));
      if(pos > -1){ // If character not in alphabet, do not change.
        pos+= shift_num;
        if (pos > 25) pos = pos - 26;
        shift += alpha.charAt(pos);
      }
      else{
        shift += str.charAt(i);
      }
    }
    return shift;
  }

  render() {
    return (
      <Container>
        <h1 className="center">Caesar Shift Cipher</h1>
        <Form.Group controlId="caesar-input">
          <Form.Label>Enter text to see shifts:</Form.Label>
          <Form.Control as="textarea" rows="3" onChange={this.handleChange} placeholder="Enter Text"/>
          <Form.Text className="text-muted">
            Any characters that are not alphabetical will be ignored!
          </Form.Text>
        </Form.Group>
        <h2 className="center">Shifts</h2>
        <div id="caesar-output"/>
      </Container>
    );
  }
}

export default Caesar;
