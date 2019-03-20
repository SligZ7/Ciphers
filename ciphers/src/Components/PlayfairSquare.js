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
      <Table responsive="sm" size="sm" className="center">
        <tbody>
          {fill_in_table(this.props.keyword)}
        </tbody>
      </Table>
      );
  }
}

//Expect letters to be a string. Could modify to work with array
function fill_in_table(letters){
  if(letters){
    var rows = [];
    for(var i=0; i<letters.length; i+=5){
      rows.push(letters.substring(i, i+5));
    }
    return rows.map(create_table_row);
  }
  else{
    //Sqaure of ? maybe
  }
}

// Helper Function for fill_in_table
function create_table_row(row, index){
  return(
    <tr key={"playfair-" + index}>
      <td>{row.charAt(0)}</td>
      <td>{row.charAt(1)}</td>
      <td>{row.charAt(2)}</td>
      <td>{row.charAt(3)}</td>
      <td>{row.charAt(4)}</td>
    </tr>
  );
}


export default PlayfairSquare;
