import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

class PlayfairSquare extends Component{
  constructor(props){
    super(props);

    this.handleCellChange = this.handleCellChange.bind(this);
  }

  handleCellChange(e){
    //TO DO
  }

  render() {
    return (
      <Table responsive='sm' size='sm' striped bordered className='playfair-square'>
        <tbody>
          {createTableRow(this.props.square, 0, this.props.readOnly)}
          {createTableRow(this.props.square, 1, this.props.readOnly)}
          {createTableRow(this.props.square, 2, this.props.readOnly)}
          {createTableRow(this.props.square, 3, this.props.readOnly)}
          {createTableRow(this.props.square, 4, this.props.readOnly)}
        </tbody>
      </Table>
      );
  }
}




//Helper Function for filling in the table
//  square: Playfair square being used. Multidimensional array.
//  row: row number to display. Integer.
//  readOnly: Whether cell can be modified or not.
function createTableRow(square, row, readOnly){
  return(
    <tr key={'playfair-' + row}>
      <td><Form.Control as='input' size='sm' className='center' plaintext={readOnly} readOnly={readOnly} value={square[row][0]}/></td>
      <td><Form.Control as='input' size='sm' className='center' plaintext={readOnly} readOnly={readOnly} value={square[row][1]}/></td>
      <td><Form.Control as='input' size='sm' className='center' plaintext={readOnly} readOnly={readOnly} value={square[row][2]}/></td>
      <td><Form.Control as='input' size='sm' className='center' plaintext={readOnly} readOnly={readOnly} value={square[row][3]}/></td>
      <td><Form.Control as='input' size='sm' className='center' plaintext={readOnly} readOnly={readOnly} value={square[row][4]}/></td>
    </tr>
  );
}


export default PlayfairSquare;
