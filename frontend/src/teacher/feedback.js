import React, { Component } from 'react';
import Burger from '../components/Burger';
import '../styles/Burger.css';

class TeacherFeedback extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };

    this.fetchFeedback = this.fetchFeedback.bind(this);
  }

  fetchFeedback() {
    let feedback = feedbackRequestor(localStorage.getItem('userType'), localStorage.getItem('userid'));
    return feedback;
  }

  render(){
    let temp = <></>
    if(localStorage.getItem('userType') === '1'){
      temp = (
        <div class="mx-auto w-75 bg-dark my-5 px-5 py-5">
        </div>
      )
    }

    return(
      <div>
        <div className="burger-bar"><Burger /></div>
        <div class="mx-auto w-75 bg-dark my-5 px-5 py-5">Feedback</div>
        {temp};
      </div>
    );
  }
}

export default TeacherFeedback;

// <li class="nav-item">
//   <Link to="/" class="nav-link">Contact Us</Link>
// </li>
