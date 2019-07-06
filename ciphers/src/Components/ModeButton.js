import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class ModeButton extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.props.modeChange(e);
  }

  render() {
    return (
        <Button type='button' variant='primary' onClick={this.handleClick}>
          {(this.props.mode === 0) ? 'Encryting' : 'Decrypting'}
        </Button>
    );
  }
}



export default ModeButton;
