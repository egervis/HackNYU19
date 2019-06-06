import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/main.css';
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
    console.log(this);

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
    this.setState({role: e.target.value});
  }

  handleRegister(e){
    console.log("Email: " + this.state.email);
    console.log("First name: " + this.state.firstName);
    console.log("Last name: " + this.state.lastName);
    console.log("Password: " + this.state.password);
    console.log("Status" + this.state.role);

    registerRequester(this.state.role, this.state.lastName, this.state.firstName, this.state.email, this.state.password)
      .then(response => {
        console.log(response);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return(
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h3 class="title text-center">Register an account</h3>
                <form class="form-signin">
                  <div class="form-label-group">
                    <input type="text" id="inputFirstname" class="form-control" placeholder="First name" 
                      value={this.state.firstName} onChange={this.handleFirstNameChange} required />
                    <label for="inputFirstname">First Name</label>
                  </div>
                  <div class="form-label-group">
                    <input type="text" id="inputLastname" class="form-control" placeholder="Last name" 
                      value={this.state.lastName} onChange={this.handleLastNameChange} required />
                    <label for="inputLastname">Last name</label>
                  </div>
                  <div class="form-label-group">
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" 
                      value={this.state.email} onChange={this.handleEmailChange} required autofocus />
                    <label for="inputEmail">Email address</label>
                  </div>
                  <div class="form-label-group">
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" 
                      value={this.state.password} onChange={this.handlePasswordChange} required />
                    <label for="inputPassword">Password</label>
                  </div>
                  <div class="form-group">
                    <select defaultValue='0' class="form-control" onChange={this.handleRole}>
                      <option value="0">I'm an instructor</option>
                      <option value="1">I'm a student</option>
                    </select>
                  </div>
                  <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.handleRegister}>Sign up</button>
                  <hr class="my-4" />
                </form>
                <Link id="signin" to="/"><button class="btn btn-lg btn-success btn-block text-uppercase" >Sign in</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Registration;
