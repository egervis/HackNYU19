import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import App from './App';
import './styles/Registration.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleLogin =this.handleLogin.bind(this);
  }

  handleEmailChange(e){
    this.setState({email: e.target.value});
  }


  handleLogin(e){
    console.log("Email: " + this.state.email);
  }

  render() {
    return (
      <div className="Registration">
        <nav class="navbar navbar-expand-md bg-dark navbar-dark py-2">
          <a class="navbar-brand">Company Name</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <Link to="/" class="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div class="container-fluid w-25 jumbotron mt-5 bg-dark">
          <form>
            <h2 class="mb-3">Register your account</h2>

            <div class="row">
              <div class="col">
                <input type="text" class="form-control" placeholder="First name"/>
              </div>

              <div class="col">
                <input type="text" class="form-control" placeholder="Last name"/>
              </div>
            </div>

            <div class="form-group">
              <label for="emailInput">Email address</label>
              <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Your email"
                  value={this.state.email} onChange={this.handleEmailChange}/>
            </div>

            <div class="form-group">
              <label for="pwInput">Password</label>
              <input type="password" class="form-control" id="pwInput" placeholder="Password"/>
            </div>

            <label for="selectRole">I am a...</label>
            <select class="custom-select my-1 mr-ms-2" id="selectRole">
              <option value="instructor" selected>Instructor</option>
              <option value="student">Student</option>
            </select>

            <button type="submit" class="btn btn-success mt-3" onClick={this.handleLogin}>Register me!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
