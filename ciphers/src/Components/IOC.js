import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container';

class IOC extends Component{
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {output: []};
  }

  handleSubmit(){
    var iocs = ['Sorry not enough characters. Need at least 40 characters.']; // Default is an error message.
    var text = document.getElementById('ioc-input').value;
    var letters = text ? text.toLowerCase().match(/[a-z]/g) : null;

    if(letters && letters.length >= 40) iocs = calculateIndexOfCoincidences(letters);
    this.setState({output: iocs})
  }

  render() {
    var iocDiffs = {};
    var sortedLengths = [];
    var iocs = this.state.output;
    iocs.forEach((ioc, index) =>
      iocDiffs[index] = Math.abs(0.0667 - ioc)
    );
    if(iocDiffs) sortedLengths Object.keys(iocDiffs).sort(function(a,b){ return iocDiffs[a] - iocDiffs[b] }));

    const output = this.state.output.map((ioc, length) =>
      <ListGroup.Item>Length:{length + 1}  IoC: {ioc}  Difference: ±{iocDiffs[length]}</ListGroup.Item>
    );
    //TO DO: Display list of IOCs ordered by IOC - 0.0667
    return (
      <Container>
        <Form>
          <Form.Group controlId='ioc-input'>
            <Form.Label/>
            <Form.Control as='textarea' rows='3' placeholder='Enter Text'/>
            <Form.Text className='text-muted'>
              Any characters that are not alphabetical will be ignored!
            </Form.Text>
          </Form.Group>
        </Form>
        <Button type='submit' variant='primary' onClick={this.handleSubmit}>Calculate Likely Key-Lengths</Button>
        <ListGroup>{output}</ListGroup>
        {sortedLengths &&
          <p>Sorted List of Lengths Closest to Normal English IoC: {sortedLengths}</p>
        }
      </Container>
      );
  }
}

//Gets the frequencies for the given letters given how they are grouped.
//i.e. Every 3rd letter of 'This is an example.' would output
//[{t: 1, s: 1, a: 1, x: 1, p: 1} {h: 1, i: 1, n: 1, a: 1, l: 1} {i: 1, s: 1, e: 2, m: 1}]
//  letters: An array of alphabetical lower case characters.
//  @Returns:
//    frequencies: An array of hashmaps that contain each letter groupings frequencies.
function getIthLetterFrequencies(letters, i){
    var frequencies = [];
    //Set up array of hashes
    for(var j=0;j<i;j++){
      frequencies.push({}); // Need to change maybe or indexOfCoincidence method.
    }

    if(letters){
      for(var k=0; k<letters.length; k++){
        (frequencies[k%i][letters[k]]) ? frequencies[k%i][letters[k]] += 1 : frequencies[k%i][letters[k]] = 1;
      }
    }
    return frequencies;
}

//Calculates the index of coincidence
//  frequencies: A hashmap comprised of lowercase alphabet characters mapped to the amount of times it appears in a given text.
//  @Returns:
//    ioc: A calculated number using the formula for ioc: https://en.wikipedia.org/wiki/Index_of_coincidence.
function indexOfCoincidence(frequencies){
  var length = Object.values(frequencies).reduce(
    function(accumulator, currentValue)
      {return accumulator + currentValue});
  var ioc = 0;
  //Iterate through alphabet
  for(var i=0; i<26; i++){
    var current = frequencies[(10+i).toString(36)];
    if(current > 0) ioc += (current * (current - 1))/(length*(length - 1));
  }
  return ioc;
}

//Calculates the index of coincidences for different letter pairing groups.
//  letters: an array of alphabetical lowercase letters
//  @Returns:
//    iocs: An array of calculated index of coincidences for different letter pairing groups.
function calculateIndexOfCoincidences(letters){
  var iocs = [];
  for(var i=1;i<=20;i++){
    var freqs = getIthLetterFrequencies(letters, i);
    freqs = freqs.map(freq => indexOfCoincidence(freq)); // Calculate ioc for each set of text
    iocs.push(freqs.reduce((accum, currentVal) => accum + currentVal)/i); // Push Average
  }
  return iocs;
}

export default IOC;
