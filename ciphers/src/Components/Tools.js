import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import FrequencyAnalysis from './FrequencyAnalysis';
import IOC from './IOC';

class Tools extends Component {
  render() {
    return (
      <Container>
        <h1>Tools</h1>
        <p>
        These are tools that can help when attempting to decrypt a message.
        </p>
        <h5>Frequency Analysis</h5>
        <p>
        Frequency analysis will provide the frequencies of a letter's appearance
        and the frequencies of the digraphs(two letter combinations) and trigraphs
        (three letter combinations).
        </p>
        <h5>Index Of Coincidence</h5>
        <p>
        Index of coincidence is a technique used for cryptanalzing a
        Vigenere cipher. You can learn more about it&nbsp;<a href='https://en.wikipedia.org/wiki/Index_of_coincidence'>here</a>.
        The expected Index of coincidence of english is 0.0667.
        </p>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Frequency Analysis
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body><FrequencyAnalysis /></Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Index Of Coincidence
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body><IOC /></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

export default Tools;
