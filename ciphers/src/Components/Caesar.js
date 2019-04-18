import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Shifts from './Shifts'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'

class Caesar extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    ReactDOM.render(
      <Shifts shifts={getShifts(event.target.value)}/>,
      document.getElementById('caesar-output')
    );
  }

  render() {
    return (
      <Container fluid>
        <Container>
          <h1 className='center'>Caesar Shift Cipher</h1>
          <Form.Group controlId='caesar-input'>
            <Form.Label>Enter text to see shifts:</Form.Label>
            <Form.Control as='textarea' rows='3' onChange={this.handleChange} placeholder='Enter Text'/>
            <Form.Text className='text-muted'>
              Any characters that are not alphabetical will be ignored and unchanged!
            </Form.Text>
          </Form.Group>
        </Container>
        <Jumbotron>
          <h2 className='center'>Shifts</h2>
          <div id='caesar-output'>
            <Shifts shifts={getShifts('')}/>
          </div>
        </Jumbotron>
      </Container>
    );
  }
}

//Gets all possible 25 useful shifts of the given input
//  input: Given string of input
//  @Returns:
//    shifts: An array of strings. All possible 25 useful shifts of the given input
function getShifts(input){
  var shifts = [];
  for(var i=1; i<26; i++){
    shifts.push(shift(input, i));
  }
  return shifts;
}

//Shift the letters in the string by given number
//  str: string to shift
//  shiftNum: number to shift alphabet by (1-25)
//  @Returns:
//    shift: A string. str with letters shifted according to shiftNum
function shift(str, shiftNum){
  str = str.toUpperCase();
  var shift = '';
  for(var i=0; i<str.length; i++){
    //Char Code 65 = 'A', Char Code 90 = 'Z'
    if(str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90){ // If character not in alphabet, do not change.
      var charCode =  str.charCodeAt(i) + shiftNum;
      if (charCode > 90) charCode -= 26;
      shift += String.fromCharCode(charCode);
    }
    else{
      shift += str.charAt(i);
    }
  }
  return shift;
}

export {shift};
export default Caesar;
