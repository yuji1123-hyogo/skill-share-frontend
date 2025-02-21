import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react"; // 永続化を適用
import { store, persistor } from './features/store/store';
import App from './App';
import "./index.css"

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 🔹 `PersistGate` を適用し、永続化データの復元が完了するまでローディング UI を表示 */}
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

