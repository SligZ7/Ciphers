import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ContentContainer from './ContentContainer';
import HomeTab from './HomeTab';
import CaesarTab from './CaesarTab';
import MonoalphaTab from './MonoalphaTab';
import VigenereTab from './VigenereTab';
import PlayfairTab from './PlayfairTab';
import ToolsTab from './ToolsTab';

function Navbar() {
  return (
    <Tabs defaultActiveKey='home' id='tab'>
      <Tab eventKey='home' title='Home'>
        <ContentContainer TabContent={<HomeTab />} />
      </Tab>
      <Tab eventKey='caesar' title='Caesar'>
        <ContentContainer TabContent={<CaesarTab />} />
      </Tab>
      <Tab eventKey='monoalpha' title='Monoalphabetic'>
        <ContentContainer TabContent={<MonoalphaTab />} />
      </Tab>
      <Tab eventKey='vigenere' title='Vigenere'>
        <ContentContainer TabContent={<VigenereTab />} />
      </Tab>
      <Tab eventKey='playfair' title='Playfair'>
        <ContentContainer TabContent={<PlayfairTab />} />
      </Tab>
      <Tab eventKey='tools' title='Tools'>
        <ContentContainer TabContent={<ToolsTab />} />
      </Tab>
    </Tabs>
  );
}

export default Navbar;
