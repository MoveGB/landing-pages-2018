import React, { Component } from 'react';
import Chooser from './components/Chooser';
import SVG  from 'react-inlinesvg';
import './App.css';
import svg from './sprite.svg';


class App extends Component {
  render() {
    const startLocality = window.startLocality;
    const startActivity = window.startActivity;
    return (
      <div className="App">
      <Chooser api={this.props.api} startLocality={startLocality} startActivity={startActivity} />
      <SVG src={svg} uniquifyIDs={false} />
      </div>
    );
  }
}

export default App;
