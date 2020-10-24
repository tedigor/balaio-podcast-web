import React from "react";
import "./App.scss";
import { SecurityProvider } from './contexts/SecurityContext';
import Routes from './Routes';

const App = () => {
  return (
    <SecurityProvider>
      <Routes />
    </SecurityProvider>
  );
}

export default App;
