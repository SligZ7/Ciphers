import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Monograph from './Monograph';
import HorizontalFrequencyGraph from './HorizontalFrequencyGraph'

class Tools extends Component{
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    var letterFreqs = letterFrequencyAnalysis(document.getElementById('tool-text').value);
    ReactDOM.render(
      <Monograph letterFreqs={letterFreqs.letters} />,
      document.getElementById('monograph-id')
    );
    ReactDOM.render(
      <HorizontalFrequencyGraph data={letterFreqs.digraphs} yLabel='Digrams' title='Digraph Frequencies' />,
      document.getElementById('digraph-id')
    );
    ReactDOM.render(
      <HorizontalFrequencyGraph data={letterFreqs.trigraphs} yLabel='Trigrams' title='Trigraph Frequencies' />,
      document.getElementById('trigraph-id')
    );
  }

  render() {
    return (
      <Container>
        <h1 className='center'>Tools</h1>
        <Form>
          <Form.Group controlId="tool-text">
            <Form.Label/>
            <Form.Control as='textarea' rows='3' placeholder='Enter Text'/>
            <Form.Text className='text-muted'>
              Any characters that are not alphabetical will be ignored!
            </Form.Text>
          </Form.Group>
        </Form>
        <Button type='submit' variant='primary' onClick={this.handleSubmit}>Analyze Text</Button>
        <div id="monograph-id" />
        <div id="digraph-id" />
        <div id="trigraph-id" />
      </Container>
      );
  }
}

//Counts frequency of letters, digraphs (two letters) and trigraphs (three letters).
//  text: string to be analyzed.
//  @Returns:
//    text: Given text that has been substituted based on the keyword given.
function letterFrequencyAnalysis(text){
    var letters = text.toLowerCase().match(/[a-z]/g); //ignore any other characters beside a-z.
    var letFreq = {}, diFreq = {}, triFreq = {};
    if(letters && letters.length > 2){
      //Loop through letters, add to hashmaps if not already and increment if already added.
      for(var i=0; i<letters.length-2; i++){
        (letFreq[letters[i]]) ? letFreq[letters[i]] += 1 : letFreq[letters[i]] = 1;
        (diFreq[(letters[i] + letters[i+1])]) ? diFreq[(letters[i] + letters[i+1])] += 1 : diFreq[(letters[i] + letters[i+1])] = 1;
        (triFreq[(letters[i] + letters[i+1] + letters[i+2])]) ? triFreq[(letters[i] + letters[i+1] + letters[i+2])] += 1 : triFreq[(letters[i] + letters[i+1] + letters[i+2])] = 1;
      }
      //Get the last two letters and last digraph
      var l = letters.length; // For Readability
      (letFreq[letters[l-2]]) ? letFreq[letters[l-2]] += 1 : letFreq[letters[l-2]] = 1;
      (letFreq[letters[l-1]]) ? letFreq[letters[l-1]] += 1 : letFreq[letters[l-1]] = 1;
      (diFreq[(letters[l-2] + letters[l-1])]) ? diFreq[(letters[l-2] + letters[l-1])] += 1 : diFreq[(letters[l-2] + letters[l-1])] = 1;
    }
    return {letters: letFreq, digraphs: diFreq, trigraphs: triFreq};
}

export default Tools;
