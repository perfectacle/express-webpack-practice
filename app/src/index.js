import React from 'react';
import {render} from 'react-dom';

import App from './App';
if (process.env.NODE_ENV !== 'production') { // HTML 핫리로드
  require('./index.html');
}
import './style.css';

let rootElement = document.getElementById('root');

render(<App/>, rootElement);

