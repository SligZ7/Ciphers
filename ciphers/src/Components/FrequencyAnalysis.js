import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Monograph from './Monograph';
import HorizontalFrequencyGraph from './HorizontalFrequencyGraph';
import { letterFrequencyAnalysis } from '../Library/Tools';

function FrequencyAnalysis() {
  const [output, setOutput] = useState({});

  const handleSubmit = () => {
    const letterFreqs = letterFrequencyAnalysis(document.getElementById('freq-input').value);
    setOutput(letterFreqs);
  }

  const monograms = output.monograms;
  const digrams = output.digrams;
  const trigrams = output.trigrams;
  return (
    <div>
      <Form>
        <Form.Group controlId='freq-input'>
          <Form.Label />
          <Form.Control as='textarea' rows='3' placeholder='Enter Text' />
          <Form.Text className='text-muted'>
            Any characters that are not alphabetical will be ignored!
            </Form.Text>
        </Form.Group>
      </Form>
      <Button type='submit' variant='primary' onClick={handleSubmit}>Analyze Text</Button>
      {monograms &&
        <Monograph letterFreqs={monograms} />
      }
      {digrams &&
        <HorizontalFrequencyGraph data={digrams} yLabel='Digrams' title='Digraph Frequencies' />
      }
      {trigrams &&
        <HorizontalFrequencyGraph data={trigrams} yLabel='Trigrams' title='Trigraph Frequencies' />
      }
    </div>
  );
}



export default FrequencyAnalysis;
