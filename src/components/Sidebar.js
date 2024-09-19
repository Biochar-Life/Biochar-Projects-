import React from 'react';
import { FaHome, FaCertificate, FaSearch, FaRegChartBar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Biochar Dashboard</h2>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaHome /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/certificates" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaCertificate /> Certificates
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaSearch /> Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaRegChartBar /> Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
