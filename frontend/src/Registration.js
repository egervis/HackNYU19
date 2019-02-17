import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import App from './App';
import './styles/Registration.css';
import { registerRequester } from './requests/requestBuilder';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      firstName:'',
      lastName:'',
      password:'',
      role:'0'
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRole = this.handleRole.bind(this);
    this.handleRegister =this.handleRegister.bind(this);
  }

  handleEmailChange(e){
    this.setState({email: e.target.value});
  }

  handleLastNameChange(e){
    this.setState({lastName: e.target.value});
  }

  handleFirstNameChange(e){
    this.setState({firstName: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }

  handleRole(e){
    console.log(e.target.value);
    this.setState({role: e.target.value});
  }

  handleRegister(e){
    console.log("Email: " + this.state.email);
    console.log("First name: " + this.state.firstName);
    console.log("Last name: " + this.state.lastName);
    console.log("Password: " + this.state.password);
    console.log("Status" + this.state.role);

    let user = registerRequester(this.state.role, this.state.lastName, this.state.firstName, this.state.email, this.state.password)
      .then(response => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
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
                <input type="text" class="form-control" value={this.state.firstName} onChange={this.handleFirstNameChange} placeholder="First name"/>
              </div>

              <div class="col">
                <input type="text" class="form-control" value={this.state.lastName} onChange={this.handleLastNameChange} placeholder="Last name"/>
              </div>
            </div>

            <div class="form-group">
              <label for="emailInput">Email address</label>
              <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Your email"
                  value={this.state.email} onChange={this.handleEmailChange}/>
            </div>

            <div class="form-group">
              <label for="pwInput">Password</label>
              <input type="password" class="form-control" id="pwInput" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
            </div>

            <label for="selectRole">I am a...</label>
            <select defaultValue='0' onChange={this.handleRole} class="custom-select my-1 mr-ms-2" id="selectRole">
              <option value='0'>Instructor</option>
              <option value='1'>Student</option>
            </select>

            <button type="submit" class="btn btn-success mt-3" onClick={this.handleRegister}>Register me!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
