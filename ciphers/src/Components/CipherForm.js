import React from 'react';
import Form from 'react-bootstrap/Form';

function CipherForm({ inputId, keywordId, formChangeHandler }) {
  return (
    <Form>
      <Form.Group controlId={keywordId}>
        <Form.Label>Keyword:</Form.Label>
        <Form.Control type='keyword' onChange={formChangeHandler} placeholder='Enter keyword' />
        <Form.Text className='text-muted'>
          Keyword is needed!
        </Form.Text>
      </Form.Group>
      <Form.Group controlId={inputId}>
        <Form.Label />
        <Form.Control as='textarea' rows='3' onChange={formChangeHandler} placeholder='Enter Text' />
        <Form.Text className='text-muted'>
          Any characters that are not alphabetical will be ignored and unchanged!
        </Form.Text>
      </Form.Group>
    </Form>
  );
}

export default CipherForm;
