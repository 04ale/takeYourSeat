import React from 'react';
import { Outlet } from 'react-router-dom'; // 1. Importe o Outlet
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Header /> 

      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default App;