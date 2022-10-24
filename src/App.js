import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Routes from './routes/Routes';
import Provider from './context/AppProvider';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
