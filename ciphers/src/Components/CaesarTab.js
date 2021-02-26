import React, { useState } from 'react';
import Shifts from './Shifts';
import Form from 'react-bootstrap/Form';
import { getShifts } from '../Library/Caesar';

function CaesarTab() {
  const [text, setText] = useState('');


  const handleChange = (e) => {
    setText(e.target.value);
  }

  const shifts = getShifts(text);

  return (
    <section className="content">
      <h1>Caesar Shift Cipher</h1>
      <p>
        A Caesar cipher is a very simple substituion cipher. It is done by shifting the
        whole alphabet by a certain amount and then using that alphabet to encrypt/decrypt the message.
        For example, if we were to encrypt the message "A dog jumped over the fence." with a shift
        of 5, the encrypted message would be "F ITL OZRUJI TAJW YMJ KJSHJ.".
          </p>
      <h5>Encrypting/Decrypting</h5>
      <Form.Group controlId='caesar-input'>
        <Form.Label>Enter text to see shifts:</Form.Label>
        <Form.Control as='textarea' rows='3' onChange={handleChange} placeholder='Enter Text' />
        <Form.Text className='text-muted'>
          Any characters that are not alphabetical will be ignored and unchanged!
            </Form.Text>
      </Form.Group>
      <div className='output-shifts'>
        <h2>Shifts</h2>
        <div id='caesar-output'>
          <Shifts shifts={shifts} />
        </div>
      </div>
    </section>
  );
}

export default CaesarTab;
