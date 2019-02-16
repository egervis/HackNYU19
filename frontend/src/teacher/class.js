import React, { Component } from 'react';
import Burger from '../components/Burger';
import '../styles/Burger.css';

class TeacherClass extends Component{
  render(){
    return(
      <div>
        <div className="burger-bar"><Burger /></div>
        <h2>this is teacher's home page</h2>
      </div>
    );
  }
}

export default TeacherClass;

// <li class="nav-item">
//   <Link to="/" class="nav-link">Contact Us</Link>
// </li>
