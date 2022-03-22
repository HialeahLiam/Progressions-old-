import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Training from './components/routes/training';
import Synthesizer from './components/routes/synthesizer';
import SignUp from './components/SignUp/SignUp';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="training" element={<Training />} />
          <Route path="synthesizer" element={<Synthesizer />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
