import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Caesar from './Caesar';
import Monoalpha from './Monoalpha';
import Vigenere from './Vigenere';
import Playfair from './Playfair';
import Tools from './Tools';

class Navbar extends Component{
  render() {
    return (
      <div>
        <Tabs defaultActiveKey='caesar' id='tab'>
          <Tab eventKey='caesar' title='Caesar'>
            <Caesar />
          </Tab>
          <Tab eventKey='monoalpha' title='Monoalphabetic'>
            <Monoalpha />
          </Tab>
          <Tab eventKey='vigenere' title='Vigenere'>
            <Vigenere />
          </Tab>
          <Tab eventKey='playfair' title='Playfair'>
            <Playfair />
          </Tab>
          <Tab eventKey='tools' title='Tools'>
            <Tools />
          </Tab>
        </Tabs>
      </div>
      );
  }
}

export default Navbar;
