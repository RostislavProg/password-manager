import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.ts'
import App from './components/App.tsx';
import { BrowserRouter } from 'react-router-dom'

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  root
);