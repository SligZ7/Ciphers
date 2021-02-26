import React, { useState } from 'react';
import Output from './Output';
import CipherForm from './CipherForm';
import ModeButton from './ModeButton';
import { monoalphabeticCipher } from '../Library/Monoalpha';

function MonoalphaTab() {
  const [mode, setMode] = useState(0);
  const [output, setOutput] = useState('');

  const modeChange = (e) => {
    (mode === 0) ? setMode(1) : setMode(0);
    translate();
  }

  function translate() {
    let text = '';
    if (document.getElementById('monoalpha-input') != null && document.getElementById('monoalpha-keyword') != null) {
      const input = document.getElementById('monoalpha-input').value;
      const keyword = document.getElementById('monoalpha-keyword').value;
      if (keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {// Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
        text = monoalphabeticCipher(keyword, input, mode);
      }
    }
    setOutput(text);
  }

  const handleChange = () => {
    translate();
  }

  return (
    <section className="content">
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
      <CipherForm keywordId='monoalpha-keyword' inputId='monoalpha-input' formChangeHandler={handleChange} />
      <ModeButton mode={mode} modeChange={modeChange} />
      <Output id='monoalpha-output' text={output} />
    </section>
  );
}

export default MonoalphaTab;
