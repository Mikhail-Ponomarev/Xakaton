import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App2 from './App2';
// Provider - обертка для всего приложения, создает доступ приложения к store
import { Provider } from 'react-redux';
// импортируем хранилище и persister
import {store, persistor} from './store/index';
// PersistGate - оберткая для всего приложения для работы с redux-persist
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <App2 />
    </PersistGate>
  </Provider>
);
root.render(
  <App2 />
)
