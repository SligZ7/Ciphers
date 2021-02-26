import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

function Shifts({ shifts }) {

  return (
    <Table responsive='md' size='xl'>
      <thead>
        <tr>
          <th>Shifted by</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {displayShifts(shifts)}
      </tbody>
    </Table>
  );
}


// Displays all given shifts
//  shifts: An array of strings
//  @Returns: HTML of table rows filled with data from shifts
function displayShifts(shifts) {
  return shifts.map(function (shift, index) {
    return (
      <tr key={'shift-' + index.toString()}>
        <td>{index + 1}</td>
        <td><Form.Control as='textarea' rows='2' plaintext value={shift} readOnly /></td>
      </tr>
    );
  });
}

export default Shifts;
