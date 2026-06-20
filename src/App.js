import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation header */}
        <Navbar />

        {/* Main page content area */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-task" element={<AddTask />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="py-3 mt-auto border-top border-muted-custom text-center text-muted-custom small">
          <div className="container">
            &copy; {new Date().getFullYear()} ProjectPortal Workspace. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
