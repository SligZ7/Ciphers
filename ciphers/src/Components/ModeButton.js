import React from 'react';

function ModeButton({ mode, modeChange }) {
  const handleClick = (e) => {
    modeChange(e);
  }

  return (
    <button type='button' onClick={handleClick}>
      {(mode === 0) ? 'Encrypting' : 'Decrypting'}
    </button>
  );
}

export default ModeButton;
