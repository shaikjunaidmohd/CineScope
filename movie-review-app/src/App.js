import './App.css';
import Home from './Home';
import MovieDetail from './MovieDetail';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path="/movies/:id" element={<MovieDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;