import React from 'react';
import Sidebar from './Sidebar';
import NewsAnnouncements from './components/NewsAnnouncements';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <NewsAnnouncements />
      </div>
    </div>
  );
}

export default App;
