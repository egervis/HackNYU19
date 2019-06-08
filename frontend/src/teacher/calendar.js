import React, { Component } from 'react';
import BurgerMenu from '../components/Burger';
import '../styles/Burger.css';

class TeacherCalendar extends Component{
  render(){
    return(
      <div>
        <div className="burger-bar"><BurgerMenu usertype='teacher'/></div>
        <div class="mx-auto w-75 bg-dark my-5 px-5 py-5">Calendar</div>
      </div>
    );
  }
}

export default TeacherCalendar;
