import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Burger from '../components/Burger';
import '../styles/Burger.css';
import { classCreateRequestor, getClassRequestor } from '../requests/requestBuilder'

class TeacherClass extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    console.log(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.createClass = this.createClass.bind(this);
    this.fetchClasses = this.fetchClasses.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  createClass(e) {
    let response = classCreateRequestor(this.state.name, localStorage.getItem('userid'));
    console.log(response);

    setTimeout(() => {this.fetchClasses()}, 1000);
  }

  fetchClasses() {
    let classes = getClassRequestor(localStorage.getItem('userid'), localStorage.getItem('usertype'));
    console.log(classes);
    return classes.data;
  }

  render(){
    let ele = <></>;
    if (localStorage.getItem('usertype') ===  '0') {
      ele = (
        <form>
          <h4 class="pb-3">Create a New Class</h4>
          <div class="form-group">
            <label for="nameInput">Name</label>
            <input type="text" class="form-control" id="nameInput" placeholder="Your Class Name"
                value={this.state.name} onChange={this.handleNameChange}/>
          </div>
          <button type="button" class="btn btn-success mt-3" onClick={this.createClass}>Create</button>
        </form>)
      }
    return(
      <div>
        <div className="burger-bar"><Burger /></div>
        <div class="mx-auto w-75 bg-dark my-5 px-5 py-5">
          <div>
            <h3 class="pb-3">Your Classes</h3>
          </div>
          {ele}
        </div>
      </div>
    );
  }
}
export default TeacherClass;

// <li class="nav-item">
//   <Link to="/" class="nav-link">Contact Us</Link>
// </li>