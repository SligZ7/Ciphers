import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

class PlayfairSquare extends Component{
  constructor(props){
    super(props);

    this.handleCellChange = this.handleCellChange.bind(this);
  }

  handleCellChange(e){
    //Maybe?
  }

  render() {
    return (
      <Table responsive='sm' size='sm' striped bordered className='playfair-square'>
        <tbody>
          {createTableRow(this.props.square, 0, this.props.read_only)}
          {createTableRow(this.props.square, 1, this.props.read_only)}
          {createTableRow(this.props.square, 2, this.props.read_only)}
          {createTableRow(this.props.square, 3, this.props.read_only)}
          {createTableRow(this.props.square, 4, this.props.read_only)}
        </tbody>
      </Table>
      );
  }
}

// Helper Function for fill_in_table
function createTableRow(square, row, read_only){
  return(
    <tr key={'playfair-' + row}>
      <td><Form.Control as='input' size='sm' className='center' plaintext={read_only} readOnly={read_only} value={square[row][0]}/></td>
      <td><Form.Control as='input' size='sm' className='center' plaintext={read_only} readOnly={read_only} value={square[row][1]}/></td>
      <td><Form.Control as='input' size='sm' className='center' plaintext={read_only} readOnly={read_only} value={square[row][2]}/></td>
      <td><Form.Control as='input' size='sm' className='center' plaintext={read_only} readOnly={read_only} value={square[row][3]}/></td>
      <td><Form.Control as='input' size='sm' className='center' plaintext={read_only} readOnly={read_only} value={square[row][4]}/></td>
    </tr>
  );
}


export default PlayfairSquare;
