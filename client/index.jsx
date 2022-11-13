import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { HashRouter } from 'react-router-dom';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(<HashRouter><App /></HashRouter>);
