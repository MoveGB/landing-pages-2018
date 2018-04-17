import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import API from './services/API';
import registerServiceWorker from './registerServiceWorker';

const api = new API();

ReactDOM.render(<App api={api} />, document.getElementById('move-what-where'));
registerServiceWorker();
