import React, { Component } from 'react';
import Burger from '../components/Burger';
import '../styles/Burger.css';

class TeacherCalendar extends Component{
  render(){
    return(
      <div>
        <div className="burger-bar"><Burger /></div>
        <h2>this is teacher's calendar page</h2>
      </div>
    );
  }
}

export default TeacherCalendar;
