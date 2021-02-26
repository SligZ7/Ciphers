import React, { useState } from 'react';
import CipherForm from './CipherForm';
import ModeButton from './ModeButton';
import Output from './Output';
import PlayfairSquare from './PlayfairSquare';
import { playfairCipher, createSquare } from '../Library/Playfair';

function PlayfairTab() {
  const [mode, setMode] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [output, setOutput] = useState('');

  const modeChange = (e) => {
    (mode === 0) ? setMode(1) : setMode(0);
    translate();
  }

  const handleChange = (e) => {
    const newKeyword = document.getElementById('playfair-keyword').value;
    setKeyword(newKeyword);
    translate();
  }

  function translate() {
    let text = '';
    if (document.getElementById('playfair-input') != null && document.getElementById('playfair-keyword') != null) {
      const input = document.getElementById('playfair-input').value;
      const keyword = document.getElementById('playfair-keyword').value;
      if (keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {// Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
        text = playfairCipher(keyword, input, mode);
      }
    }
    setOutput(text);
  }

  return (
    <section className="content">
      <h1>Playfair Cipher</h1>
      <p>
        A Playfair cipher is digraph substitution cipher that uses a square created from a keyword.
        </p>
      <p>
        The square is created by removing duplicates after a letter first appears and then filling in a
        5x5 square left to right, top to bottom. Similar to monoalphabetic substituion any unused letters follow
        after in the order they normally appear. Typically J is removed and replaced by I.
        </p>
      <p>
        When encrypting, the text must be grouped into digraphs(group of two characters), digraphs may not
        contain two of the same letters and a filler must be inserted, and if the text is uneven after this another
        filler is needed at the end. When encrypting a digraph there are rules to follow to get the encrpyted characters.
        Based on the square:
          <ol>
          <li>When not in the same row or column, slide to the left/right to other characters column.</li>
          <li>When both are in the same row. Go to the right once.</li>
          <li>When both are in the same column. Go down one.</li>
        </ol>
        Decrypting is very similar except you go left when in the same row, and go up when in the same column.
        </p>
      <h5>Encrypting/Decrypting</h5>
      <CipherForm keywordId='playfair-keyword' inputId='playfair-input' formChangeHandler={handleChange} />
      <ModeButton mode={mode} modeChange={modeChange} />
      <h3>Table Being Used</h3>
      <div id='playfair-table'>
        <PlayfairSquare square={createSquare(keyword)} read_only />
      </div>
      <Output id='playfair-output' text={output} />
    </section>
  );
}


export default PlayfairTab;
