import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

class PlayfairSquare extends Component{
  constructor(props){
    super(props);

    this.handleCellChange = this.handleCellChange.bind(this);
  }

  handleCellChange(e){

  }

  render() {
    return (
      <Table responsive="sm" size="sm" className="center" striped bordered>
        <tbody>
          {create_table_row(this.props.square, 0, this.props.read_only)}
          {create_table_row(this.props.square, 1, this.props.read_only)}
          {create_table_row(this.props.square, 2, this.props.read_only)}
          {create_table_row(this.props.square, 3, this.props.read_only)}
          {create_table_row(this.props.square, 4, this.props.read_only)}
        </tbody>
      </Table>
      );
  }
}

//Expect letters to be a string. Could modify to work with array
function fill_in_table(square){
  var table;

}

// Helper Function for fill_in_table
function create_table_row(square, row, read_only){
  return(
    <tr key={"playfair-" + row}>
      <td><Form.Control as="input" rows="1" size="sm" plaintext={read_only} value={square[row][0]}/></td>
      <td><Form.Control as="input" rows="1" size="sm" plaintext={read_only} value={square[row][1]}/></td>
      <td><Form.Control as="input" rows="1" size="sm" plaintext={read_only} value={square[row][2]}/></td>
      <td><Form.Control as="input" rows="1" size="sm" plaintext={read_only} value={square[row][3]}/></td>
      <td><Form.Control as="input" rows="1" size="sm" plaintext={read_only} value={square[row][4]}/></td>
    </tr>
  );
}


export default PlayfairSquare;
