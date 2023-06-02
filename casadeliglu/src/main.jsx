import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/styles/styles.css'
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";       

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
