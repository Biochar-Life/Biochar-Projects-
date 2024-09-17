import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Certificates from './components/Certificates'; 
import Search from './components/Search';
import Reports from './components/Reports';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <header className="App-header">
            <h1>Biochar Dashboard</h1>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/search" element={<Search />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
=======
import './App.css';
import Login from './components/Login.js';

function App() {
  return (
    <div className="App">
      <Login />
    </div>
>>>>>>> cd93b10 (Initial Commit)
  );
}

export default App;
