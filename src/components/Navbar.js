import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <CheckSquare className="me-2 text-primary-custom" size={24} />
          <span className="fw-bold tracking-tight">ProjectPortal</span>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-task">Add Task</Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center ms-auto">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-theme-toggle d-flex align-items-center justify-content-center"
              aria-label="Toggle dark mode"
              id="theme-toggle-btn"
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-secondary" />
              ) : (
                <Sun size={20} className="text-warning" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
