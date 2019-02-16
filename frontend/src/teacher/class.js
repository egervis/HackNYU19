import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Burger from '../components/Burger';
import '../styles/Burger.css';

class TeacherClass extends Component{
  render(){
    return(
      <div>
        <div className="burger-bar"><Burger /></div>
        <div class="mx-auto w-75 bg-dark my-5 px-5 py-5">Your Classes</div>
      </div>
    );
  }
}

export default TeacherClass;

// <li class="nav-item">
//   <Link to="/" class="nav-link">Contact Us</Link>
// </li>
