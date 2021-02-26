import React from 'react';
import Button from 'react-bootstrap/Button';

function ModeButton({ mode, modeChange }) {
  const handleClick = (e) => {
    modeChange(e);
  }

  return (
    <Button type='button' variant='primary' onClick={handleClick}>
      {(mode === 0) ? 'Encrypting' : 'Decrypting'}
    </Button>
  );
}

export default ModeButton;
