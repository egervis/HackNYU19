import '../styles/Burger.css';

import React from 'react';
import {Link} from 'react-router-dom';
import {elastic as Menu} from 'react-burger-menu';

export const BurgerMenu = props => {
  const logout = () => {
    localStorage.clear();
  };

  return (
    <div id="outer-container">
      <Menu
        className="menu"
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
      >
        <Link to={'/dashboard'} className="menu-item">
          Classes
        </Link>
        <Link to={'/teacher/calendar'} className="menu-item">
          Calendar
        </Link>
        <Link to={'/teacher/feedback'} className="menu-item">
          Feedback
        </Link>
        <Link to="/" onClick={logout} className="menu-item">
          Log out
        </Link>
      </Menu>
    </div>
  );
};

export default BurgerMenu;
