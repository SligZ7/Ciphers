import React, { useState } from 'react';
import CipherForm from './CipherForm';
import ModeButton from './ModeButton';
import Output from './Output';
import { vigenereCipher } from '../Library/Vigenere';

function VigenereTab() {
  const [mode, setMode] = useState(0);
  const [output, setOutput] = useState('');

  const modeChange = (e) => {
    (mode === 0) ? setMode(1) : setMode(0);
  }

  const handleChange = () => {
    translate()
  }

  function translate() {
    let text = '';
    if (document.getElementById('vigenere-input') != null && document.getElementById('vigenere-keyword') != null) {
      const input = document.getElementById('vigenere-input').value;
      const keyword = document.getElementById('vigenere-keyword').value;
      if (keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {// Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
        text = vigenereCipher(keyword, input, this.state.mode);
      }
    }
    setOutput(text);
  }


  return (
    <section className="content">
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
      <CipherForm keywordId='vigenere-keyword' inputId='vigenere-input' formChangeHandler={handleChange} />
      <ModeButton mode={mode} modeChange={modeChange} />
      <br /><br />
      <Output id='vigenere-output' text={output} />
    </section>
  );
}

export default VigenereTab;