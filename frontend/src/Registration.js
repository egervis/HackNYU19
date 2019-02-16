import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './App';

class Registration extends Component {
  render() {
    return (
      <div className="Registration">
        <nav class="navbar navbar-expand-md fixed-top bg-dark navbar-dark py-2">
          <a class="navbar-brand" href="#">Company Name</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="index.html">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </nav>

        <div class="container-fluid w-25 jumbotron mt-5 bg-dark">
          <form>
            <div class="mb-3">Register your account</div>

            <div class="row">
              <div class="col">
                <input type="text" class="form-control" placeholder="First name">
              </div>

              <div class="col">
                <input type="text" class="form-control" placeholder="Last name">
              </div>
            </div>

            <div class="form-group">
              <label for="emailInput">Email address</label>
              <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Your email">
            </div>

            <div class="form-group">
              <label for="pwInput">Password</label>
              <input type="password" class="form-control" id="pwInput" placeholder="Password">
            </div>

            <label for="selectRole">I am a...</label>
            <select class="custom-select my-1 mr-ms-2" id="selectRole">
              <option value="instructor" selected>Instructor</option>
              <option value="student">Student</option>
            </select>

            <button type="submit" class="btn btn-success mt-3">Register me!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
