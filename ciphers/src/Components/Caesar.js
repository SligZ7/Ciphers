import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

class Caesar extends Component{
  render() {
    return (
      <div className="Caesar">
        <div class="container">
          Hello Caesar Here!
          <Form.Group controlId="caesar-input">
            <Form.Label>Insert Text</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
        </div>
      </div>
      );
  }
}

export default Caesar;
