import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./Components/Navbar"
import './App.css';

class App extends Component {
  render(props) {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
