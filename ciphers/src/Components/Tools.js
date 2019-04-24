import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class Tools extends Component{
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    var letterFreqs = letterFrequencyAnalysis(document.getElementById('tool-text').value);
    console.log(letterFreqs.letters);
    console.log(letterFreqs.digraphs);
    console.log(letterFreqs.trigraphs);
    console.log(letterFreqs);
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
        <Button type='submit' variant='primary' onClick={this.handleSubmit}>Submit</Button>
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
    var letterFreq = {}, digraphFreq = {}, trigraphFreq = {};
    if(letters && letters.length > 2){
      //Loop through letters, add to hashmaps if not already and increment if already added.
      for(var i=0; i<letters.length-2; i++){
        (letterFreq[letters[i]]) ? letterFreq[letters[i]] += 1 : letterFreq[letters[i]] = 1;
        (digraphFreq[(letters[i] + letters[i+1])]) ? digraphFreq[(letters[i] + letters[i+1])] += 1 : digraphFreq[(letters[i] + letters[i+1])] = 1;
        (trigraphFreq[(letters[i] + letters[i+1] + letters[i+2])]) ? trigraphFreq[(letters[i] + letters[i+1] + letters[i+2])] += 1 : trigraphFreq[(letters[i] + letters[i+1] + letters[i+2])] = 1;
      }
      //Get the last two letters and last digraph
      var l = letters.length; // For Readability
      (letterFreq[letters[l-2]]) ? letterFreq[letters[l-2]] += 1 : letterFreq[letters[l-2]] = 1;
      (letterFreq[letters[l-1]]) ? letterFreq[letters[l-1]] += 1 : letterFreq[letters[l-1]] = 1;
      (digraphFreq[(letters[l-2] + letters[l-1])]) ? digraphFreq[(letters[l-2] + letters[l-1])] += 1 : digraphFreq[(letters[l-2] + letters[l-1])] = 1;
    }
    return {letters: letterFreq, digraphs: digraphFreq, trigraphs: trigraphFreq};
}

export default Tools;
