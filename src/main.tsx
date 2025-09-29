import React from 'react';
import ReactDOM from 'react-dom/client';
import { CounterDisplay } from './components/CounterDisplay';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CounterDisplay />
  </React.StrictMode>,
);
