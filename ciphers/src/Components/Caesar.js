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

function getShifts(input){
  var shifts = [];
  for(var i=1; i<26; i++){
    shifts.push(shift(input, i));
  }
  return shifts;
}

function shift(str, shiftNum){
  str = str.toUpperCase();
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var shift = '';
  for(var i=0; i<str.length; i++){
    var pos = alpha.indexOf(str.charAt(i));
    if(pos > -1){ // If character not in alphabet, do not change.
      pos+= shiftNum;
      if (pos > 25) pos = pos - 26;
      shift += alpha.charAt(pos);
    }
    else{
      shift += str.charAt(i);
    }
  }
  return shift;
}

export {getShifts, shift};
export default Caesar;
