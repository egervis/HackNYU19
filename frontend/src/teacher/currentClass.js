import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Burger from '../components/Burger';
import '../styles/Burger.css';

class currentClass extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    console.log(this);
    this.fetchClasses = this.fetchClasses.bind(this);
  }

  render(){
    return(
      <div>
        <div className="burger-bar"><Burger /></div>
        <div class="mx-auto w-75 bg-dark my-5 px-5 py-5">
          <div>
            <h3 class="pb-3">Current Class</h3>
          </div>
        </div>
      </div>
    );
  }
}
export default currentClass;

// <li class="nav-item">
//   <Link to="/" class="nav-link">Contact Us</Link>
// </li>
