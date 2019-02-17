import React, { Component } from 'react';
import Burger from '../components/Burger';
import '../styles/Burger.css';

class TeacherFeedback extends Component{
  render(){
    return(
      <div>
        <div className="burger-bar"><Burger /></div>
        <div class="mx-auto w-75 bg-dark my-5 px-5 py-5">Feedback</div>
      </div>
    );
  }
}

export default TeacherFeedback;

// <li class="nav-item">
//   <Link to="/" class="nav-link">Contact Us</Link>
// </li>
