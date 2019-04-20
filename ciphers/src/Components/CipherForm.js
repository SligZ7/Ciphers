import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

class CipherForm extends Component{
  render() {
    return (
      <Form>
        <Form.Group controlId={this.props.keywordId}>
          <Form.Label>Keyword:</Form.Label>
          <Form.Control type='keyword' onChange={this.props.keywordChangeHandler} placeholder='Enter keyword'/>
          <Form.Text className='text-muted'>
            Keyword is needed!
          </Form.Text>
        </Form.Group>
        <Form.Group controlId={this.props.inputId}>
          <Form.Label/>
          <Form.Control as='textarea' rows='3' onChange={this.props.textChangeHandler} placeholder='Enter Text'/>
          <Form.Text className='text-muted'>
            Any characters that are not alphabetical will be ignored and unchanged!
          </Form.Text>
        </Form.Group>
      </Form>
      );
  }
}

export default CipherForm;
