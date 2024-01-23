import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { App } from './app/App'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './app/store/store';
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/styles/styles.scss'
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <PersistGate persistor={ persistor }>
    <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
    </PersistGate>
  //</React.StrictMode>,
)
