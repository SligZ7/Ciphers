import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';

class HomeTab extends Component {
  render() {
    return (
      <Container>
        <br/>
        <h1>What Are Ciphers?</h1>
        <p>
        A cipher is an algorithm for encrypting or decrypting a message. There
        are many different types of ciphers, some more classical and others more
        modern. Currently we have some of the more common simple classical ciphers.
        </p>
        <br/>
        <h5>Common Classical Types</h5>
        <ul>
          <li>Substitution Ciphers (monoalphabetic)</li>
          <li>Polyalphabetic Ciphers</li>
          <li>Transposition Ciphers</li>
        </ul>
        <br/>
        <h5>Resources</h5>
        <p>
        'The Code Book: The Science of Secrecy from Ancient Egypt to Quantum Cryptography'
        by Simon Singh is an excellent resource to learn about Cryptography and its history.
        </p>
      </Container>
    );
  }
}


export default HomeTab;
