import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Burger from '../components/Burger';
import '../styles/Burger.css';

class TeacherClass extends Component{
  render(){
    return(
      <div>
        <main>
          <div className="burger-bar"><Burger /></div>
          <div id="mainbody" class="w-75">this is teacher's home page</div>
        </main>
      </div>
    );
  }
}

export default TeacherClass;

// <li class="nav-item">
//   <Link to="/" class="nav-link">Contact Us</Link>
// </li>
