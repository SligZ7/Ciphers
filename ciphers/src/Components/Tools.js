import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import FrequencyAnalysis from './FrequencyAnalysis';
import IOC from './IOC';

class Tools extends Component{
  render() {
    return (
      <Container>
        <h1 className='center'>Tools</h1>
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
