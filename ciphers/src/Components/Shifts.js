import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'


class Shifts extends Component{
  render() {
    return (
      <Table responsive="md" size="xl" className="center">
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
      <tr key={"shift-" + index.toString()}>
        <td>{index + 1}</td>
        <td><Form.Control as="textarea" rows="2" readOnly={true} value={shift}/></td>
      </tr>
  );
  });
}

export default Shifts;
