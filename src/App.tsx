import React, { useState } from 'react';
import { Map } from './Map'
import './App.css';

function App() {

  const [isArchEnable, setIsArchEnable] = useState<boolean>(false);
  const handleToggleArcs = () => setIsArchEnable(!isArchEnable);

  return (
    <div className="App">
      <h4>Map Demo</h4>
      <Map arcsEnabled={isArchEnable} />

      <div className='controls'>
        <button onClick={handleToggleArcs}>Arcs</button>
      </div>
    </div>
  );
}

export default App;
