import React, { Component } from 'react';
import Burger from '../components/Burger';
import '../styles/Burger.css';
import {getFeedback} from '../requests/requestBuilder';

class TeacherFeedback extends Component{
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      studentID: ''
    };

    this.fetchFeedback = this.fetchFeedback.bind(this);
    this.feedbackLoop = this.feedbackLoop.bind(this);
  }

  fetchFeedback() {
    let feedback = getFeedback(localStorage.getItem('userid'), localStorage.getItem('userType'));
    return feedback;
  }

  feedbackLoop() {
    const arr = this.fetchFeedback();
    let feedbacks = '';
    for(let i=0; i<arr.length; i++){
      feedbacks+='<div class="mx-auto w-75 bg-dark my-5 px-5 py-5">'+arr[i].feedbackText+'</div>';
    }
    return feedbacks;
  }

  createfb(e) {
    this.setState({feedback: e.target.value});
    this.setState({studentID: e.target.value});
  }

  render(){
    let temp = <></>
    temp = (
        this.feedbackLoop()
    )
    if(localStorage.getItem('userType') === '0'){
      let createF = (
        <form>
          <label for="selectStud">Enter</label>
          <input id="selectStud" value={this.state.feedback}></input>
          <button type="button" class="btn btn-success mt-3" onClick={this.createfb}>Create Feedback</button>
        </form>
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
