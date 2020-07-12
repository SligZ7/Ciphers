import React, {Component} from 'react';
import Output from './Output';
import Container from 'react-bootstrap/Container';
import CipherForm from './CipherForm';
import ModeButton from './ModeButton';
import {monoalphabeticCipher} from '../Api/MonoalphaApi';

class Monoalpha extends Component {
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
    if (document.getElementById('monoalpha-input') != null && document.getElementById('monoalpha-keyword') != null) {
      const input = document.getElementById('monoalpha-input').value;
      const keyword = document.getElementById('monoalpha-keyword').value;
      if (keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {// Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
        output = monoalphabeticCipher(keyword, input, this.state.mode);
      }
    }
    return output;
  }

  handleChange(e) {
    this.setState({output: ''}); // Needed to rerender output when change occurs.
  }

  render() {
    const mode = this.state.mode;
    const output = this.getOutput(); // Needed to sync with button press
    return (
      <Container>
        <h1>Monoalphabetic Cipher</h1>
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

export default Monoalpha;
