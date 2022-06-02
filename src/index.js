import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import RouteProvider from './components/RouteProvider';
import { Provider } from 'react-redux';
import {persistedStore, store } from './components/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <RouteProvider>
          <App />
        </RouteProvider> 
      </PersistGate>
    </Provider>  
  </BrowserRouter>
);
