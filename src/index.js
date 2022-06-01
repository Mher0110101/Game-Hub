import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import RouteProvider from './components/RouteProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RouteProvider>
      <App />
    </RouteProvider>    
  </BrowserRouter>
);
