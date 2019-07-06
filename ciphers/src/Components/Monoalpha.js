import React, { Component } from 'react';
import Output from './Output';
import Container from 'react-bootstrap/Container';
import CipherForm from './CipherForm';
import ModeButton from './ModeButton';

class Monoalpha extends Component{
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
    if(document.getElementById('monoalpha-input') != null && document.getElementById('monoalpha-keyword') != null){
      var input = document.getElementById('monoalpha-input').value;
      var keyword = document.getElementById('monoalpha-keyword').value;
      if(keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {//Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
        output = monoalphabeticCipher(keyword, input, this.state.mode);
      }
    }
    return output;
  }

  handleChange(e){
    this.setState({output: ''}); // Needed to rerender output when change occurs.
  }

  render() {
    const mode = this.state.mode;
    const output = this.getOutput(); //Needed to sync with button press
    return (
      <Container>
        <h1 className='center'>Monoalphabetic Cipher</h1>
        <h5>About</h5>
        <p>
        A monoalphabetic cipher is a substituion cipher. It is done by creating a cipher alphabet
        based on a keyword.
        </p>
        <p>
        This cipher alphabet is created by removing any duplicates after the
        first appearance of a letter and adding all other letters not included in the keyword to the end.
        For example, If the keyword was "Cryptology", the resulting cipher alphabet would be "CRYPTOLGABDEFHJKMNPQSUVWXZ".
        </p>
        <p>
        When encrpyting/decrypting we substitute the original letter with the corresponding alphabet.
        For example, using the same keyword as before, "They've caught on!" would be encrpyted as "QGTXUTYCSLGQIH", while
        "SHPTMNQIIP" would be decrypted as "understood".
        </p>
        <h5>Encrypting/Decrypting</h5>
        <CipherForm keywordId='monoalpha-keyword' keywordChangeHandler={this.handleChange} inputId='monoalpha-input' textChangeHandler={this.handleChange} />
        <ModeButton mode={mode} modeChange={this.modeChange} />
        <br/><br/>
        <Output id='monoalpha-output' text={output}/>
      </Container>
    );
  }
}

//Performs monoalphabetic substituion.
//  keyword: String of letters used to create new alphabet to perform substituion.
//  text: String to encrypt/decrypt.
//  @Returns:
//    output: Given text that has been substituted based on the keyword given.
function monoalphabeticCipher(keyword, text, mode=0){
  var output = ''
  var oldToNewHash = getOldToNewAlphabetHash(getCipherAlphabet(keyword), mode);
  text = mode ? text.toUpperCase() : text.toLowerCase();
  for(var i=0; i<=text.length; i++){
    if(text.charAt(i).match(/[a-zA-Z]/)) output += oldToNewHash[text.charAt(i)];
  }
  return output;
}

//Creates cipher alphabet from keyword.
//Cipher alphabet is constructed removing any repetitions in keyword and adding any missing letters to the end
//in the order they appear in the normal alphabet.
//  keyword: String of letters used to create new alphabetic to perform substituion.
//  @Returns:
//    cipherAlpha: Cipher alphabet constructed using keyword.
function getCipherAlphabet(keyword){
  var letters = keyword.toUpperCase().match(/[A-Z]/g); //ignore any other characters beside a-z.
  var regAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var cipherAlpha = '';

  if(letters){
    var i = 0;
    while (i < letters.length && cipherAlpha.length !== 26) {
      if(cipherAlpha.indexOf(letters[i]) < 0) {
        cipherAlpha += letters[i];
        regAlpha = regAlpha.replace(letters[i], '');
      }
      i++;
    }
  }
  if(cipherAlpha.length < 26) cipherAlpha += regAlpha; //Fill rest of new alphabet with remaining letters.
  return cipherAlpha;
}

//Creates hashmap linking the old alphabet to the new, for ease of replacing text.
//  keyword: String of letters used to create new alphabetic to perform substituion.
//  mode: Integer of one or zero. 0: Encrypt, 1: Decrypt.
//  @Returns:
//    hash: Maps old to new alphabet
function getOldToNewAlphabetHash(cipherAlpha, mode=0){
  var regAlpha = 'abcdefghijklmnopqrstuvwxyz';
  var hash = {};

  for(var i=0; i<cipherAlpha.length; i++){
    mode ? hash[cipherAlpha.charAt(i)] = regAlpha.charAt(i) : hash[regAlpha.charAt(i)] = cipherAlpha.charAt(i);
  }
  return hash;
}

export {getCipherAlphabet, getOldToNewAlphabetHash};
export default Monoalpha;
