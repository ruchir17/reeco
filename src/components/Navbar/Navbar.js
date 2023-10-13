import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Store from '../Store/Store';
import Orders from '../Orders/Orders';
import Analytics from '../Analytics/Analytics';
import "./styles.css"

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="tabs">
        <Link to="/" className="logo">
            Reeco
          </Link>
          <Link to="/store" className="tab">
            Store
          </Link>
          <Link to="/orders" className="tab">
            Orders
          </Link>
          <Link to="/analytics" className="tab">
            Analytics
          </Link>
        </div>
        <div className="icons">
          <FaShoppingCart className="icon" />
          <div className="user-info" onClick={toggleDropdown}>
            Hello, James
            {isDropdownOpen && (
              <div className="dropdown">
                <p>Settings</p>
                <p>Logout</p>
              </div>
            )}
          </div>
        </div>
      </nav>

      <Routes>
      <Route path="/"  />
        <Route path="/store" element={<Store />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
};

export default Navbar;
