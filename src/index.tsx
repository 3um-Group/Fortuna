import 'module-alias/register';

import * as React from "react";
import * as ReactDOM from "react-dom/client";

import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import "./index.css";

registerServiceWorker();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
