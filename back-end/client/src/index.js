import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './Container';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter  } from 'react-router-dom'

ReactDOM.render((
  <HashRouter>
    <Container />
  </HashRouter>
), document.getElementById('root'));
registerServiceWorker();

