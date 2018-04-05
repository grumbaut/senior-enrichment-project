import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand" to='/'>
      <img src='/images/small-rocket-ship-silhouette.svg' style={{width: '30px'}} /> MHI
    </NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/" activeClassName='active'>Home <span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/campuses" activeClassName='active'>Campuses</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/students" activeClassName='active'>Students</NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default withRouter(Nav);
