import React, { Component } from 'react';
import Burger from '../components/Burger';

class TeacherHome extends Component{
  render(){
    return(
      <div>
        <Burger />
        <h1>WELCOME</h1>
        <h2>this is teacher's home page</h2>
      </div>
    );
  }
}

export default TeacherHome;
