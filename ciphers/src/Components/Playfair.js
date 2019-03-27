import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import PlayfairSquare from './PlayfairSquare'
import {getNewAlphabet} from './Monoalpha'

class Playfair extends Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.keywordChange = this.keywordChange.bind(this);
    this.state = {mode: 0, keyword: ''};
  }

  handleChange(e, modeChange){
    var input = document.getElementById('playfair-input').value;
    var keyword = document.getElementById('playfair-keyword').value;
    var mode = this.state.mode;
    if(modeChange) {
      (mode === 0) ? mode = 1 : mode = 0;
    }

    if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
      ReactDOM.render(
        <p>{playfairCipher(keyword, input, mode)}</p>,
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

  render() {
    return (
      <Container>
        <h1 className='center'>Playfair Cipher</h1>
        <Form>
          <Form.Group controlId='playfair-keyword'>
            <Form.Label>Keyword:</Form.Label>
            <Form.Control type='keyword' onChange={this.keywordChange} placeholder='Enter keyword'/>
            <Form.Text className='text-muted'>
              Keyword is needed!
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='playfair-input'>
            <Form.Label/>
            <Form.Control as='textarea' rows='3' onChange={this.handleChange} placeholder='Enter Text'/>
            <Form.Text className='text-muted'>
              Any characters that are not alphabetical will be ignored and unchanged!
            </Form.Text>
          </Form.Group>
        </Form>
        <Button id='playfair-mode' type='button' variant='primary' onClick={this.handleClick}>
          {(this.state.mode === 0) ? 'Encrypt Mode' : 'Decrypt Mode'}
        </Button>
        <br/><br/>
        <h3 className='center'>Table Being Used</h3>
        <div id='playfair-table'>
          <PlayfairSquare square={createSquare(this.state.keyword)} read_only/>
        </div>
        <Jumbotron>
          <h2 className='center'>Output</h2>
          <div id='playfair-output'/>
        </Jumbotron>
      </Container>
    );
  }
}

//Mode indicates whether to encrypt or decrypt.
//  0: Encrypt, 1:Decrypt
function playfairCipher(keyword, text, mode=0, letter_to_replace='j', replacement='i'){
  var square = createSquare(keyword);
  var newText = '';
  var rowHash = createRowHash(square);
  var colHash = createColHash(square);
  var letters = text.toLowerCase().match(/[a-z]/g); //Need to replace all letter_to_replace with replacement.
  if(mode === 0) letters = formatText(letters); //Reformat text for encryption
  if(letters.length % 2 === 0) { //Has to be even since letters are paired together to encipher/decipher
    for(var i=0; i<letters.length; i+=2){
      //Perform encryption/decryption based on case.
      if(rowHash[letters[i]] === rowHash[letters[i+1]]){ //Row Case
        newText += rowCase(square, rowHash[letters[i]], colHash[letters[i]], colHash[letters[i+1]], mode);
      }
      else if (colHash[letters[i]] === colHash[letters[i+1]]) { // Column case
        newText += colCase(square, colHash[letters[i]], rowHash[letters[i]], rowHash[letters[i+1]], mode);
      }
      else{ //Square case
        newText += squareCase(square, rowHash[letters[i]], colHash[letters[i]], rowHash[letters[i+1]], colHash[letters[i+1]]);
      }
    }
  }
  return newText;
}

//Need to modify text for playfair
// letters: an array of letters
function formatText(letters, letter_to_replace, replacement){
  for(var i=0; i<letters.length; i+=2){
    if (letters[i] === letter_to_replace) letters[i] = replacement; //See if letter need to be replaced.
    if (!letters[i+1]) { // Add filler,but don't create repetitions (leads to infinite looping)
      if(letters[i] === 'x'){
        letters.push('z');
      }
      else{
        letters.push('x');
      }
    }
    if (letters[i+1] === letter_to_replace) letters[i+1] = replacement; //See if letter need to be replaced.
    if (letters[i] === letters[i+1]) {//Need to ensure letters are not the same
      if(letters[i] === 'x'){
        letters.splice(i+1, 0, 'z');
      }
      else{
        letters.splice(i+1, 0, 'x');
      }
    }
  }
  return letters;
}

//Square case, when not in same row or column.
function squareCase(square, row_a, col_a, row_b, col_b){
  return (square[row_a][col_b] + square[row_b][col_a]);
}

//Row case, when in the same row. Encrypt go to the right one, Decrypt do to the left one.
function rowCase(square, row, col_a, col_b, mode=0){
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
function colCase(square, col, row_a, row_b, mode=0){
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

function createSquare(keyword, letter_to_replace='j'){
  var i       // the first-order index in square
    , j       // the second order index in square
    , square = [];
  keyword = getNewAlphabet(keyword).replace(letter_to_replace, ''); // Still needs to replace letter with intended replacement when encrypting
  for(i=0; i<5;i++){
    square[i] = [];
    for(j=0; j<5;j++){
      square[i][j] = keyword.charAt(i * 5 + j);
    }
  }
  return square;
}

function createRowHash(square){
  var i, j, hash = {};
  for(i=0; i<5;i++){
    for(j=0; j<5;j++){
      hash[square[i][j]] = i;
    }
  }
  return hash;
}

function createColHash(square){
  var i, j, hash = {};
  for(i=0; i<5;i++){
    for(j=0; j<5;j++){
      hash[square[i][j]] = j;
    }
  }
  return hash;
}

export default Playfair;
