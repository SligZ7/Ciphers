import React from 'react';
import Card from 'react-bootstrap/Card';
import FrequencyAnalysis from './FrequencyAnalysis';
import IOC from './IOC';

function ToolsTab() {
  return (
    <section className="content">
      <h1>Tools</h1>
      <p>
        These are tools that can help when attempting to decrypt a message.
        </p>
      <h5>Frequency Analysis</h5>
      <p>
        Frequency analysis will provide the frequencies of a letter's appearance
        and the frequencies of the digraphs(two letter combinations) and trigraphs
        (three letter combinations).
        </p>
      <h5>Index Of Coincidence</h5>
      <p>
        Index of coincidence is a technique used for cryptanalzing a
        Vigenere cipher. You can learn more about it&nbsp;<a href='https://en.wikipedia.org/wiki/Index_of_coincidence'>here</a>.
        The expected Index of coincidence of english is 0.0667.
        </p>
    </section>
  );
}

export default ToolsTab;