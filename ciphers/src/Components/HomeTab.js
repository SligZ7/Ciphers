import React from 'react';

function HomeTab() {
  /*
    TODO: ADD STLYE
  */
  return (
    <section className="content">
      <h1>What Are Ciphers?</h1>
      <p>
        A cipher is an algorithm for encrypting or decrypting a message. There
        are many different types of ciphers, some more classical and others more
        modern. Currently we have some of the more common simple classical ciphers.
      </p>
      <h5>Common Classical Types</h5>
      <ul>
        <li>Substitution Ciphers (monoalphabetic)</li>
        <li>Polyalphabetic Ciphers</li>
        <li>Transposition Ciphers</li>
      </ul>
      <h5>Resources</h5>
      <p>
        'The Code Book: The Science of Secrecy from Ancient Egypt to Quantum Cryptography'
        by Simon Singh is an excellent resource to learn about Cryptography and its history.
      </p>
    </section>
  );
}

export default HomeTab;
