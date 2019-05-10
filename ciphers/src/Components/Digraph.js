import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import BarChart from 'react-chartjs';

class Digraph extends Component{
  render() {
    return (
        <BarChart data={this.props.digraphs} />
      );
  }
}

export default Digraph;
