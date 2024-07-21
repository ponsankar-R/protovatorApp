import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './MainComponents/Home';
import History from './MainComponents/History';
import Goals from './MainComponents/Goals';
import Finance from './MainComponents/Finance';
import NavBar from './NavBar';

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/History" element={<History />} />
        <Route path="/Goals" element={<Goals />} />
        <Route path='/Finance' element={<Finance/>}/>
      </Routes>

    </Router>
  );
};

export default App;
