import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'

class Output extends Component{
  render() {
    return (
      <Jumbotron>
        <h2 className='center'>Output</h2>
        <div id={this.props.id}/>
      </Jumbotron>
      );
  }
}

export default Output;
