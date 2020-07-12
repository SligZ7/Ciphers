import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import CipherForm from './CipherForm';
import ModeButton from './ModeButton';
import Output from './Output';
import {vigenereCipher} from '../Api/VigenereApi';

class Vigenere extends Component {
  constructor(props) {
    super(props);

    this.modeChange = this.modeChange.bind(this);
    this.getOutput = this.getOutput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      mode: 0,
      output: '',
    };
  }

  modeChange(e) {
    (this.state.mode === 0) ? this.setState({mode: 1}) : this.setState({mode: 0});
  }

  getOutput() {
    let output = '';
    if (document.getElementById('vigenere-input') != null && document.getElementById('vigenere-keyword') != null) {
      const input = document.getElementById('vigenere-input').value;
      const keyword = document.getElementById('vigenere-keyword').value;
      if (keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {// Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
        output = vigenereCipher(keyword, input, this.state.mode);
      }
    }
    return output;
  }

  handleChange(e, mode_change) {
    this.setState({output: ''}); // Needed to rerender output when change occurs.
  }

  render() {
    const mode = this.state.mode;
    const output = this.getOutput(); // Needed to sync with button press
    return (
      <Container>
        <h1>Vigenere Cipher</h1>
        <p>
        A Vigenere cipher is polyalphabetic cipher that encorporates shifts of a caesar cipher.
        </p>
        <p>
        The keyword is used to construct the alphabets, each letter uses the shift of the alphabet that
        the letter starts with. Also it should be noted that duplicate letters are not removed as they
        are in monoalphabetic substituion ciphers.
        </p>
        <p>
        Encrypting/Decrypting is done by using a letters shift to encrypt a character and then using the next shift to encrypt
        the next charcter and then wrapping back to the beginning when the end of the keyword is reached. For example, the
        message "Today's weather will be bad."encrpyted with the keyword WEATHER will result in "PSDTFWNAETALVNEPLULFRZ".
        Taking this step by step, t would be encrpyted by the cipheralphabet where W is first, then o by E's cipheralphabet
        and so on until it reaches e which would then be encrypted using W's cipheralphabet again as we have wrapped around
        after reaching the end. Decrypting is done in a similar manner, but backwards.
        </p>
        <h5>Encrypting/Decrypting</h5>
        <CipherForm keywordId='vigenere-keyword' keywordChangeHandler={this.handleChange} inputId='vigenere-input' textChangeHandler={this.handleChange} />
        <ModeButton mode={mode} modeChange={this.modeChange} />
        <br/><br/>
        <Output id='vigenere-output' text={output}/>
      </Container>
    );
  }
}

export default Vigenere;
