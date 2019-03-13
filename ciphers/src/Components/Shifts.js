import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table'


class Shifts extends Component{
  render() {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Shifted by</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {display_shifts(this.props.shifts)}
        </tbody>
      </Table>
      );
  }
}

function display_shifts(shifts){
  return shifts.map(function(shift,index){
    return(
      <tr>
        <td>{index + 1}</td>
        <td>{shift}</td>
      </tr>
  );
  });
}

export default Shifts;
