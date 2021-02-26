import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { calculateIndexOfCoincidences } from '../Library/Tools';

function IOC() {
  const [ioc, setIoc] = useState([]);

  const handleSubmit = () => {
    let iocs = ['Sorry not enough characters. Need at least 40 characters.']; // Default is an error message.
    const text = document.getElementById('ioc-input').value;
    const letters = text ? text.toLowerCase().match(/[a-z]/g) : null;
    if (letters && letters.length >= 40) iocs = calculateIndexOfCoincidences(letters);
    setIoc(iocs);
  }

  const iocDiffs = {};
  let sortedLengths = [];
  const iocs = ioc;
  iocs.forEach((ioc, index) =>
    iocDiffs[index] = Math.abs(0.0667 - ioc)
  );
  if (iocDiffs) {
    sortedLengths = Object.keys(iocDiffs).sort(function (a, b) {
      return iocDiffs[a] - iocDiffs[b];
    });
  }

  const output = ioc.map((ioc, length) =>
    <ListGroup.Item>Length:{length + 1}  IoC: {ioc}  Difference: ±{iocDiffs[length]}</ListGroup.Item>
  );
  // TO DO: Display list of IOCs ordered by IOC - 0.0667
  return (
    <div>
      <Form>
        <Form.Group controlId='ioc-input'>
          <Form.Label />
          <Form.Control as='textarea' rows='3' placeholder='Enter Text' />
          <Form.Text className='text-muted'>
            Any characters that are not alphabetical will be ignored!
            </Form.Text>
        </Form.Group>
      </Form>
      <Button type='submit' variant='primary' onClick={handleSubmit}>Calculate Likely Key-Lengths</Button>
      <ListGroup>{output}</ListGroup>
      {sortedLengths &&
        <p>Sorted List of Lengths Closest to Normal English IoC: {sortedLengths}</p>
      }
    </div>
  );
}

export default IOC;
