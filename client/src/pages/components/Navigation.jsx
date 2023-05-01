import React from 'react';
import {useNavigate } from "react-router-dom";
function Navigation(props) {
  const navigate = useNavigate();
  
  return (
    <nav className="navigation">
      <ul>
        <li className={props.activeLink === 'dashboard' ? 'active' : ''}>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className={props.activeLink === 'createRequest' ? 'active' : ''}>
          <a href="/create-request">Create New Request</a>
        </li>
        <li className={props.activeLink === 'approvedRequest' ? 'active' : ''}>
          <a href="/approved-request">Approved Request</a>
        </li>
        <li className={props.activeLink === 'waitingRequest' ? 'active' : ''}>
          <a href="/waiting-request">Waiting Request</a>
        </li>
        <li className={props.activeLink === 'viewRequest' ? 'active' : ''}>
        {navigate("/requestneed", { state: { data: props.data } })}
          <a href="/view-request">View Request</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
