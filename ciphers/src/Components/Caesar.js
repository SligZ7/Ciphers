import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

class Caesar extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.caesar_shift = this.caesar_shift.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    ReactDOM.render(
      <Col>{this.caesar_shift(event.target.value, 1)}</Col>,
      document.getElementById('caesar-output')
    );
  }

  caesar_shift(str, shift_num){
    str = str.toLowerCase(); // Probably should also check for only characters in alphabet.
    var alpha = "abcdefghijklmnopqrstuvwxyz";
    var shift = "";
    for(var i=0; i<str.length; i++){
      var pos = alpha.indexOf(str.charAt(i)) + shift_num;
      if (pos > 25) pos = pos - 26;
      shift = shift.concat(alpha.charAt(pos));
    }
    console.log(shift);
    return shift;
  }

  render() {
    return (
      <div className="Caesar">
        <Container>
          <Row>
            <Col>
              <Form.Group controlId="caesar-input">
                <Form.Label>Insert Text</Form.Label>
                <Form.Control as="textarea" rows="3" onChange={this.handleChange}/>
              </Form.Group>
            </Col>
          </Row>
          <Row id="caesar-output"/>
        </Container>
      </div>
      );
  }
}

/*
function get_shifts(input){
  var shifts = [];
  var i;
  for(i=1; i<26; i++){
    shifts.push(caesar_shift(input, i));
  }
  return shifts;
}
*/
/*
function caesar_shift(str, shift_num){
  str = str.toLowerCase(); // Probably should also check for only characters in alphabet.
  var alpha = "abcdefghijklmnopqrstuvwxyz";
  var shift = "";
  for(var i=0; i<str.length; i++){
    var character = alpha.charAt(alpha.indexOf(str.charAt(i)) + shift_num);
    shift.concat(character);
    console.log("PASS");
    console.log(i);
    console.log(character);
    console.log(shift);
  }
  return shift;
}
*/

export default Caesar;
