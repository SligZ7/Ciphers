import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Caesar from "./Caesar"
import Monoalpha from "./Monoalpha"
import Vigenere from "./Vigenere"
import Playfair from "./Playfair"

class Navbar extends Component{
  constructor() {
    super();
    //this.state = { activetab:["Caesar"]}
  }

  render() {
    return (
      <div className="Navbar">
        <Tabs defaultActiveKey="caesar" id="tab">
          <Tab eventKey="caesar" title="Caesar">
            <Caesar />
          </Tab>
          <Tab eventKey="monoalpha" title="Monoalphabetic">
            <Monoalpha />
          </Tab>
          <Tab eventKey="vigenere" title="Vigenere">
            <Vigenere />
          </Tab>
          <Tab eventKey="playfair" title="Playfair">
            <Playfair />
          </Tab>
        </Tabs>
      </div>
      );
  }
}

export default Navbar;
