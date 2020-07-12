import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import CipherForm from './CipherForm';
import ModeButton from './ModeButton';
import Output from './Output';
import PlayfairSquare from './PlayfairSquare';
import {playfairCipher, createSquare} from '../Library/Playfair';

class PlayfairTab extends Component {
  constructor(props) {
    super(props);

    this.modeChange = this.modeChange.bind(this);
    this.getOutput = this.getOutput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      mode: 0,
      keyword: '',
    };
  }

  modeChange(e) {
    (this.state.mode === 0) ? this.setState({mode: 1}) : this.setState({mode: 0});
  }

  getOutput() {
    let output = '';
    if (document.getElementById('playfair-input') != null && document.getElementById('playfair-keyword') != null) {
      const input = document.getElementById('playfair-input').value;
      const keyword = document.getElementById('playfair-keyword').value;
      if (keyword.match(/[a-zA-Z]/) && input.match(/[a-zA-Z]/)) {// Won't do anything unless both have some sort of input. Make sure inputs have alphabetical components.
        output = playfairCipher(keyword, input, this.state.mode);
      }
    }
    return output;
  }

  handleChange(e, modeChange) {
    const keyword = document.getElementById('playfair-keyword').value;
    this.setState({keyword: keyword});
  }

  render() {
    const mode = this.state.mode;
    const keyword = this.state.keyword;
    const output = this.getOutput();
    return (
      <Container>
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
        <CipherForm keywordId='playfair-keyword' keywordChangeHandler={this.handleChange} inputId='playfair-input' textChangeHandler={this.handleChange} />
        <ModeButton mode={mode} modeChange={this.modeChange} />
        <br/><br/>
        <h3 className='center'>Table Being Used</h3>
        <div id='playfair-table'>
          <PlayfairSquare square={createSquare(keyword)} read_only/>
        </div>
        <Output id='playfair-output' text={output}/>
      </Container>
    );
  }
}

export default PlayfairTab;
