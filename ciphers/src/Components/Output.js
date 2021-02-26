import React from 'react';

function Output({ id, text }) {
  console.log(text)
  return (
    <div className='output'>
      <h2>Output</h2>
      <div id={id}>
        {text &&
          <p>{text}</p>
        }
      </div>
    </div>
  );
}


export default Output;
