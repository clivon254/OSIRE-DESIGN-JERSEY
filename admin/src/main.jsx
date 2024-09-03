import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import App from './App.jsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from "./redux/store.js"
import StoreContextProvider from './context/store.jsx'


createRoot(document.getElementById('root')).render(
  

  <StrictMode>

    <PersistGate persistor={persistor}>

      <Provider store={store}>

        <StoreContextProvider>

          <App />

        </StoreContextProvider>
      
      </Provider>

    </PersistGate>


  </StrictMode>,
)
