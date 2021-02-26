import React from 'react';
import Form from 'react-bootstrap/Form';

function PlayfairSquare({ square, readOnly }) {
  //TODO, Make it modifiable for a tool to solve playfair ciphers
  return (
    <table className='playfair-square'>
      <tbody>
        {createTableBody(square, readOnly)}
      </tbody>
    </table>
  );
}

// Helper Function for filling in the table body
//  square: Playfair square being used. Multidimensional array.
//  readOnly: Whether cell can be modified or not.
function createTableBody(square, readOnly) {
  return square.map((row, index) => {
    return <tr key={'playfair-' + index}>{createTableRow(square, index, readOnly)}</tr>
  });
}

// Helper Function for filling in the table rows
//  square: Playfair square being used. Multidimensional array.
//  row: row number to display. Integer.
//  readOnly: Whether cell can be modified or not.
function createTableRow(square, row, readOnly) {
  return square[row].map((element) => {
    const form = <Form.Control as='input' size='sm' value={element} />
    return <td>{(readOnly) ? form : element}</td>
  });
}

export default PlayfairSquare;