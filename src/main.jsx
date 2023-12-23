import React      from 'react';
import ReactDOM      from 'react-dom';
import App               from './App.jsx';
import { Provider }         from 'react-redux';
import { store, persistor }   from './Redux/Store'; 
import { PersistGate }          from 'redux-persist/integration/react';
import { GoogleOAuthProvider }    from '@react-oauth/google'
import './index.css';



ReactDOM.render(
  <GoogleOAuthProvider clientId='948865882196-hv2sngfc1on3ieamjcr8v1brjaubo5ak.apps.googleusercontent.com'>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

