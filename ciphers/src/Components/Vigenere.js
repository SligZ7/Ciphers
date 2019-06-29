import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CipherForm from './CipherForm';
import ModeButton from './ModeButton';
import Output from './Output';
import {shift} from './Caesar';
import {getOldToNewAlphabetHash} from './Monoalpha'

class Vigenere extends Component{
  constructor(props){
    super(props);

    this.modeChange = this.modeChange.bind(this);
    this.getOutput = this.getOutput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      mode: 0,
      output: ''
    };
  }

  modeChange(e){
    (this.state.mode === 0) ? this.setState({mode: 1}) : this.setState({mode: 0});
  }

  getOutput(){
    var output = '';
    if(document.getElementById('vigenere-input') != null && document.getElementById('vigenere-keyword') != null){
      var input = document.getElementById('vigenere-input').value;
      var keyword = document.getElementById('vigenere-keyword').value;
      if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
        output = vigenereCipher(keyword, input, this.state.mode);
      }
    }
    return output;
  }

  handleChange(e, mode_change){
    this.setState({output: ''}); // Needed to rerender output when change occurs.
  }

  render() {
    const mode = this.state.mode;
    const output = this.getOutput(); //Needed to sync with button press
    return (
      <Container>
        <h1 className='center'>Vigenere Cipher</h1>
        <CipherForm keywordId='vigenere-keyword' keywordChangeHandler={this.handleChange} inputId='vigenere-input' textChangeHandler={this.handleChange} />
        <ModeButton mode={mode} modeChange={this.modeChange} />
        <br/><br/>
        <Output id='vigenere-output' text={output}/>
      </Container>
    );
  }
}

//Performs Vignere substituion.
//  keyword: String of letters used to create new alphabets to perform substituion.
//  text: String to encrypt/decrypt.
//  Mode indicates whether to encrypt or decrypt. 0: Encrypt, 1:Decrypt
//  @Returns:
//    output: Given text that has been substituted based on the keyword given.
function vigenereCipher(keyword, text, mode=0){
  var output = '';
  var oldToNewAlphasHashes = getOldToNewHashes(getCipherAlphabets(keyword), mode);
  var pos = 0; //Used to track current cipher alpha we're using.
  if(oldToNewAlphasHashes){
    text = mode ? text.toUpperCase() : text.toLowerCase(); // Cipher text is usually upper case. Plain text is usually lower case.
    for(var i=0; i<text.length; i++){
      if(text.charAt(i).match(/[a-zA-Z]/)){
        output += oldToNewAlphasHashes[pos][text.charAt(i)];
        ((pos + 1) < oldToNewAlphasHashes.length) ? pos++ : pos = 0; // Wraps back to beginning
      }
    }
  }
  return output;
}

//Creates cipher alphabets from keyword to use for vigenere cipher.
//Each cipher alphabet is constructed by shifting the regular alphabet so that the current letter is the first letter.
//  keyword: String of letters used to create new alphabets to perform substituion.
//  @Returns:
//    cipherAlphas: An array of strings containing the cipher alphabets.
function getCipherAlphabets(keyword){
  var letters = keyword.toUpperCase().match(/[A-Z]/g); //ignore any other characters beside a-z.
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var cipherAlphas = [];
  if(letters){
    for(var i=0; i<letters.length; i++){
      cipherAlphas.push(shift(alpha, alpha.indexOf(letters[i])));
    }
  }
  return cipherAlphas;
}

//Creates an array of hashes that are used to encode/decode text.
//  cipherAlphas: Array of Strings. Each is a cipher alphabet
//  @Returns:
//    hashes: Array of hashes.
function getOldToNewHashes(cipherAlphas, mode=0){
  var hashes = [];
  if(cipherAlphas){
    for(var i=0; i<cipherAlphas.length; i++){
      hashes.push(getOldToNewAlphabetHash(cipherAlphas[i], mode));
    }
  }
  return hashes;
}


export default Vigenere;
