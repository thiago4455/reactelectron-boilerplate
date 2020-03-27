import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'babel-polyfill';

window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
};
