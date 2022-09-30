import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Collections from './components/routes/collections/collections';
import Training from './components/routes/training';
// import Synthesizer from './components/routes/synthesizer';
import SignUp from './components/routes/SignUp';
import Login from './components/routes/Login';
import ReactComponents from './components/routes/ReactComponents';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Collections />} />
          <Route path="training" element={<Training />} />
          <Route path="collections" element={<Collections />} />
          {/* <Route path="synthesizer" element={<Synthesizer />} /> */}
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="react-components" element={<ReactComponents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
