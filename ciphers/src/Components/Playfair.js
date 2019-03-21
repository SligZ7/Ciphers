import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import PlayfairSquare from './PlayfairSquare'
import {get_new_alphabet} from './Monoalpha'

class Playfair extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.keywordChange = this.keywordChange.bind(this);
    this.create_square = this.create_square.bind(this);
    this.create_row_hash = this.create_row_hash.bind(this);
    this.create_col_hash = this.create_col_hash.bind(this);
    this.playfair_cipher = this.playfair_cipher.bind(this);
    this.format_text = this.format_text.bind(this);
    this.square_case = this.square_case.bind(this);
    this.row_case = this.row_case.bind(this);
    this.col_case = this.col_case.bind(this);

    this.state = {mode: 0, keyword: ""};
  }

  handleChange(e, mode_change){
    var input = document.getElementById("playfair-input").value;
    var keyword = document.getElementById("playfair-keyword").value;
    var mode = this.state.mode;
    if(mode_change) {
      (mode === 0) ? mode = 1 : mode = 0;
    }

    if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
      ReactDOM.render(
        <p>{this.playfair_cipher(keyword, input, mode)}</p>,
        document.getElementById('playfair-output')
      );
    }
    else{
      ReactDOM.render(
        <p/>,
        document.getElementById('playfair-output')
      );
    }
  }

  handleClick(e){
    (this.state.mode === 0) ? this.setState({mode: 1}) : this.setState({mode: 0});
    this.handleChange(e, true);
  }

  keywordChange(e){
    this.setState({keyword: e.target.value});
    this.handleChange();
  }


  //Mode indicates whether to encrypt or decrypt.
  //  0: Encrypt, 1:Decrypt
  playfair_cipher(keyword, text, mode=0, letter_to_replace="j", replacement="i"){
    var square = this.create_square(keyword);
    var i;
    var new_text = "";
    var row_hash = this.create_row_hash(square);
    var col_hash = this.create_col_hash(square);
    var letters = text.toLowerCase().match(/[a-z]/g); //Need to replace all letter_to_replace with replacement.
    if(mode === 0){ //Encrypting
      console.log("hello");
      letters = this.format_text(letters);
      /*for(i=0; i<letters.length - 1; i+=2){
        //Perform encryption based on case.
        if(row_hash[letters[i]] === row_hash[letters[i+1]]){ //Row Case
          new_text += this.row_case(square, row_hash[letters[i]], col_hash[letters[i]], col_hash[letters[i+1]]);
        }
        else if (col_hash[letters[i]] === col_hash[letters[i+1]]) { // Column case
          new_text += this.col_case(square, col_hash[letters[i]], row_hash[letters[i]], row_hash[letters[i+1]]);
        }
        else{ //Square case
          new_text += this.square_case(square, row_hash[letters[i]], row_hash[letters[i+1]], col_hash[letters[i]], col_hash[letters[i+1]]);
        }
      }*/
    }
    else{ // Decrypting
      /*for(i=0; i<letters.length - 1; i+=2){
        //Perform decryption based on case.
        if(row_hash[letters[i]] === row_hash[letters[i+1]]){ //Row Case
          new_text += this.row_case(square, row_hash[letters[i]], col_hash[letters[i]], col_hash[letters[i+1]], mode);
        }
        else if (col_hash[letters[i]] === col_hash[letters[i+1]]) { // Column case
          new_text += this.col_case(square, col_hash[letters[i]], row_hash[letters[i]], row_hash[letters[i+1]], mode);
        }
        else{ //Square case
          new_text += this.square_case(square, row_hash[letters[i]], row_hash[letters[i+1]], col_hash[letters[i]], col_hash[letters[i+1]]);
        }
      }*/
    }
    return new_text;
  }

  //Need to modify text for playfair
  // letters: an array of letters
  format_text(letters, letter_to_replace, replacement){
    for(var i=0; i<letters.length; i+=2){
      if (letters[i] === letter_to_replace) letters[i] = replacement; //See if letters need to be replaced.
      if (!letters[i+1]) { // Add filler,but don't create repetitions (leads to infinite looping)
        if(letters[i] === "x"){
          letters.push("z");
        }
        else{
          letters.push("x");
        }
      }
      if (letters[i+1] === letter_to_replace) letters[i+1] = replacement;
      if (letters[i] === letters[i+1]) {//Need to ensure letters are not the same
        if(letters[i] === "x"){
          letters.splice(i+1, 0, "z");
        }
        else{
          letters.splice(i+1, 0, "x");
        }
      }
    }
    return letters;
  }

  //Square case, when not in same row or column.
  square_case(square, row_a, col_a, row_b, col_b){
    return (square[row_a][col_b] + square[row_b][col_a]);
  }

  //Row case, when in the same row. Encrypt go to the right one, Decrypt do to the left one.
  row_case(square, row, col_a, col_b, mode=0){
    if(mode === 0){
      (col_a + 1 > 4) ? col_a -= 4 : col_a++;
      (col_b + 1 > 4) ? col_b -= 4 : col_b++;
      return (square[row][col_a] + square[row][col_b]);
    }
    else{
      (col_a - 1 < 0) ? col_a += 4 : col_a--;
      (col_b - 1 < 0) ? col_b += 4 : col_b--;
      return (square[row][col_a] + square[row][col_b]);
    }
  }

  //Column case, when in the same column. Encrypt go to the down one, Decrypt do to the up one.
  col_case(square, col, row_a, row_b, mode=0){
    if(mode === 0){
      (row_a - 1 < 0) ? row_a += 4 : row_a--;
      (row_b - 1 < 0) ? row_b += 4 : row_b--;
      return (square[row_a][col] + square[row_b][col]);
    }
    else{
      (row_a + 1 > 4) ? row_a -= 4 : row_a++;
      (row_b + 1 > 4) ? row_b -= 4 : row_b++;
      return (square[row_a][col] + square[row_b][col]);
    }
  }

  create_square(keyword, letter_to_replace="j"){
    var i       // the first-order index in square
      , j       // the second order index in square
      , square = [];
    keyword = get_new_alphabet(keyword).replace(letter_to_replace, ""); // Still needs to replace letter with intended replacement when encrypting
    for(i=0; i<5;i++){
      square[i] = [];
      for(j=0; j<5;j++){
        square[i][j] = keyword.charAt(i * 5 + j);
      }
    }
    return square;
  }

  create_row_hash(square){
    var i, j, hash = {};
    for(i=0; i<5;i++){
      for(j=0; j<5;j++){
        hash[square[i][j]] = i;
      }
    }
    return hash;
  }

  create_col_hash(square){
    var i, j, hash = {};
    for(i=0; i<5;i++){
      for(j=0; j<5;j++){
        hash[square[i][j]] = j;
      }
    }
    return hash;
  }

  render() {
    return (
      <Container>
        <h1 className="center">Playfair Cipher</h1>
        <Form>
          <Form.Group controlId="playfair-keyword">
            <Form.Label>Keyword:</Form.Label>
            <Form.Control type="keyword" onChange={this.keywordChange} placeholder="Enter keyword"/>
            <Form.Text className="text-muted">
              Keyword is needed!
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="playfair-input">
            <Form.Label/>
            <Form.Control as="textarea" rows="3" onChange={this.handleChange} placeholder="Enter Text"/>
            <Form.Text className="text-muted">
              Any characters that are not alphabetical will be ignored and unchanged!
            </Form.Text>
          </Form.Group>
        </Form>
        <Button id="playfair-mode" type="button" variant="primary" onClick={this.handleClick}>
          {(this.state.mode === 0) ? "Encrypt Mode" : "Decrypt Mode"}
        </Button>
        <br/><br/>
        <h3 className="center">Table Being Used</h3>
        <div id="playfair-table">
          <PlayfairSquare square={this.create_square(this.state.keyword)} read_only={true}/>
        </div>
        <Jumbotron>
          <h2 className="center">Output</h2>
          <div id="playfair-output"/>
        </Jumbotron>
      </Container>
    );
  }
}

export default Playfair;
