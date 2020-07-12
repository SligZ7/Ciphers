import React, {Component} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import HomeTab from './HomeTab';
import CaesarTab from './CaesarTab';
import MonoalphaTab from './MonoalphaTab';
import VigenereTab from './VigenereTab';
import PlayfairTab from './PlayfairTab';
import ToolsTab from './ToolsTab';

class Navbar extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey='home' id='tab'>
          <Tab eventKey='home' title='Home'>
            <HomeTab />
          </Tab>
          <Tab eventKey='caesar' title='Caesar'>
            <CaesarTab />
          </Tab>
          <Tab eventKey='monoalpha' title='Monoalphabetic'>
            <MonoalphaTab />
          </Tab>
          <Tab eventKey='vigenere' title='Vigenere'>
            <VigenereTab />
          </Tab>
          <Tab eventKey='playfair' title='Playfair'>
            <PlayfairTab />
          </Tab>
          <Tab eventKey='tools' title='Tools'>
            <ToolsTab />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Navbar;
