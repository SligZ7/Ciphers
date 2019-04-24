import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import CipherForm from './CipherForm';
import Button from 'react-bootstrap/Button';
import Output from './Output';
import PlayfairSquare from './PlayfairSquare';
import {getNewAlphabet} from './Monoalpha';

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
        <CipherForm keywordId='playfair-keyword' keywordChangeHandler={this.keywordChange} inputId='playfair-input' textChangeHandler={this.handleChange} />
        <Button id='playfair-mode' type='button' variant='primary' onClick={this.handleClick}>
          {(this.state.mode === 0) ? 'Encrypt Mode' : 'Decrypt Mode'}
        </Button>
        <br/><br/>
        <h3 className='center'>Table Being Used</h3>
        <div id='playfair-table'>
          <PlayfairSquare square={createSquare(this.state.keyword)} read_only/>
        </div>
        <Output id='playfair-output' />
      </Container>
    );
  }
}

//Performs Playfair substituion.
//  keyword: String of letters used to create new alphabets to perform substituion.
//  text: String to encrypt/decrypt.
//  mode: indicates whether to encrypt or decrypt. 0: Encrypt, 1:Decrypt
//  letterToReplace: Square can only have 25 letters, so one must be replaced. j is usually replaced by i.
//  replacement: letter that will be used as replacement.
//  @Returns:
//    newText: Given text that has been substituted based on the keyword given.
function playfairCipher(keyword, text, mode=0, letterToReplace='j', replacement='i'){
  var square = createSquare(keyword);
  var newText = '';
  var hash = createHash(square);
  var rowHash = hash.row;
  var colHash = hash.col;
  var letters = text.toLowerCase().match(/[a-z]/g); //Need to replace all letterToReplace with replacement.
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

//Modifies text for playfair
//  text: String to encrypt/decrypt.
//  letterToReplace: Square can only have 25 letters, so one must be replaced. j is usually replaced by i.
//  replacement: letter that will be used as replacement.
//  @Returns:
//    letters: an array of letters
function formatText(letters, letterToReplace, replacement){
  for(var i=0; i<letters.length; i+=2){
    if (letters[i] === letterToReplace) letters[i] = replacement; //See if letter need to be replaced.
    if (!letters[i+1]) { // Add filler, but don't create repetitions (leads to infinite looping)
      if(letters[i] === 'x'){
        letters.push('z');
      }
      else{
        letters.push('x');
      }
    }
    if (letters[i+1] === letterToReplace) letters[i+1] = replacement; //See if letter need to be replaced.
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
//  square: Playfair square being used. Multidimensional Array.
//  rowA: row of first letter.
//  rowB: row of second letter.
//  colA: column of first letter.
//  colB: column of second letter.
//  @Returns: Two letters encrypted/decrypted.
function squareCase(square, rowA, colA, rowB, colB){
  return (square[rowA][colB] + square[rowB][colA]);
}

//Row case, when in the same row. Encrypt go to the right one, Decrypt do to the left one.
//  square: Playfair square being used. Multidimensional Array.
//  row: row of letters.
//  colA: column of first letter.
//  colB: column of second letter.
//  mode: indicates whether to encrypt or decrypt. 0: Encrypt, 1:Decrypt
//  @Returns: Two letters encrypted/decrypted.
function rowCase(square, row, colA, colB, mode=0){
  if(mode === 0){
    (colA + 1 > 4) ? colA -= 4 : colA++;
    (colB + 1 > 4) ? colB -= 4 : colB++;
    return (square[row][colA] + square[row][colB]);
  }
  else{
    (colA - 1 < 0) ? colA += 4 : colA--;
    (colB - 1 < 0) ? colB += 4 : colB--;
    return (square[row][colA] + square[row][colB]);
  }
}

//Column case, when in the same column. Encrypt go to the down one, Decrypt do to the up one.
//  square: Playfair square being used. Multidimensional Array.
//  rowA: row of first letter.
//  rowB: row of second letter.
//  col: column of letters.
//  mode: indicates whether to encrypt or decrypt. 0: Encrypt, 1:Decrypt
//  @Returns: Two letters encrypted/decrypted.
function colCase(square, col, rowA, rowB, mode=0){
  if(mode === 0){
    (rowA - 1 < 0) ? rowA += 4 : rowA--;
    (rowB - 1 < 0) ? rowB += 4 : rowB--;
    return (square[rowA][col] + square[rowB][col]);
  }
  else{
    (rowA + 1 > 4) ? rowA -= 4 : rowA++;
    (rowB + 1 > 4) ? rowB -= 4 : rowB++;
    return (square[rowA][col] + square[rowB][col]);
  }
}

//Creates Plafair square based on keyword. Used keyword with letter repetitions ignored
//and add any missing letters to the end(except letterToReplace) in the order they normally
//appear.
//  keyword: string used to construct square.
//  letterToReplace: letter to ignore when creating square. Usually j.
//  @Returns:
//    square: Plafair square. Multidimensional array of single letters.
function createSquare(keyword, letterToReplace='j'){
  var i       // the first-order index in square
    , j       // the second order index in square
    , square = [];
  keyword = getNewAlphabet(keyword).replace(letterToReplace, ''); // Still needs to replace letter with intended replacement when encrypting
  for(i=0; i<5;i++){
    square[i] = [];
    for(j=0; j<5;j++){
      square[i][j] = keyword.charAt(i * 5 + j);
    }
  }
  return square;
}

//Creates row and col hash of the letters in square.
//  square: Playfair square being used. Multidimensional array.
//@Returns:
//  hash: returns object containing rowHash and colHash.
function createHash(square){
  var i, j, rowHash = {}, colHash = {};
  for(i=0; i<5;i++){
    for(j=0; j<5;j++){
      rowHash[square[i][j]] = i;
      colHash[square[i][j]] = j;
    }
  }
  return {row: rowHash, col: colHash};
}

export default Playfair;
