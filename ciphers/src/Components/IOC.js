import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import {calculateIndexOfCoincidences} from '../Library/Tools';

class IOC extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {output: []};
  }

  handleSubmit() {
    let iocs = ['Sorry not enough characters. Need at least 40 characters.']; // Default is an error message.
    const text = document.getElementById('ioc-input').value;
    const letters = text ? text.toLowerCase().match(/[a-z]/g) : null;

    if (letters && letters.length >= 40) iocs = calculateIndexOfCoincidences(letters);
    this.setState({output: iocs});
  }

  render() {
    const iocDiffs = {};
    let sortedLengths = [];
    const iocs = this.state.output;
    iocs.forEach((ioc, index) =>
      iocDiffs[index] = Math.abs(0.0667 - ioc)
    );
    if (iocDiffs) {
      sortedLengths = Object.keys(iocDiffs).sort(function(a, b) {
        return iocDiffs[a] - iocDiffs[b];
      });
    }

    const output = this.state.output.map((ioc, length) =>
      <ListGroup.Item>Length:{length + 1}  IoC: {ioc}  Difference: ±{iocDiffs[length]}</ListGroup.Item>
    );
    // TO DO: Display list of IOCs ordered by IOC - 0.0667
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

export default IOC;
