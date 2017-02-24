'use strict';
import React from 'react';
import { render } from 'react-dom';

if(process.env.NODE_ENV !== 'production') { // HTML 핫리로드
  require('./index.html');
}
import './style.css';
import Comp from './Comp';

render(
  <Comp/>, document.getElementById('app')
);