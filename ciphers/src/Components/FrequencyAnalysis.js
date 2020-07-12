import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Monograph from './Monograph';
import HorizontalFrequencyGraph from './HorizontalFrequencyGraph';
import {letterFrequencyAnalysis} from '../Library/Tools';

class FrequencyAnalysis extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {output: {}};
  }

  handleSubmit() {
    const letterFreqs = letterFrequencyAnalysis(document.getElementById('freq-input').value);
    this.setState({output: letterFreqs});
  }

  render() {
    const monograms = this.state.output.monograms;
    const digrams = this.state.output.digrams;
    const trigrams = this.state.output.trigrams;
    return (
      <Container>
        <Form>
          <Form.Group controlId='freq-input'>
            <Form.Label/>
            <Form.Control as='textarea' rows='3' placeholder='Enter Text'/>
            <Form.Text className='text-muted'>
              Any characters that are not alphabetical will be ignored!
            </Form.Text>
          </Form.Group>
        </Form>
        <Button type='submit' variant='primary' onClick={this.handleSubmit}>Analyze Text</Button>
        {monograms &&
          <Monograph letterFreqs={monograms} />
        }
        {digrams &&
          <HorizontalFrequencyGraph data={digrams} yLabel='Digrams' title='Digraph Frequencies' />
        }
        {trigrams &&
          <HorizontalFrequencyGraph data={trigrams} yLabel='Trigrams' title='Trigraph Frequencies' />
        }
      </Container>
    );
  }
}


export default FrequencyAnalysis;
