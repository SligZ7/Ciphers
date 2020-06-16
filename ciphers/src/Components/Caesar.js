import React, {Component} from 'react';
import Shifts from './Shifts';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {getShifts} from '../Api/CaesarApi';

class Caesar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {input: ''};
  }

  handleChange(e) {
    this.setState({input: e.target.value});
  }

  render() {
    const shifts = getShifts(this.state.input);
    return (
      <Container fluid>
        <Container>
          <h1 className='center'>Caesar Shift Cipher</h1>
          <h5>About</h5>
          <p>
          A Caesar cipher is a very simple substituion cipher. It is done by shifting the
          whole alphabet by a certain amount and then using that alphabet to encrypt/decrypt the message.
          For example, if we were to encrypt the message "A dog jumped over the fence." with a shift
          of 6, the encrypted message would be "F ITL OZRUJI TAJW YMJ KJSHJ.".
          </p>
          <h5>Encrypting/Decrypting</h5>
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
            <Shifts shifts={shifts}/>
          </div>
        </Jumbotron>
      </Container>
    );
  }
}

export default Caesar;
