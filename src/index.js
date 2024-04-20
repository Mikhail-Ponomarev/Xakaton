import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import {store, persistor} from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import {Main} from './Pages/Main'
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId='805206962011-jshq1eno4takehaaurr499t1un9pcvft.apps.googleusercontent.com'>
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);



