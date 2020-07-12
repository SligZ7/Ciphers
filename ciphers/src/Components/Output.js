import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

class Output extends Component {
  render() {
    return (
      <Container className='output'>
        <h2 className='center'>Output</h2>
        <div id={this.props.id}>
          {this.props.text &&
            <Form.Control as='textarea' rows='2' plaintext value={this.props.text} readOnly />
          }
        </div>
      </Container>
    );
  }
}

export default Output;
