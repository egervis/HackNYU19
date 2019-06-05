import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { loginRequester, registerRequester } from './requests/requestBuilder';
import './styles/Registration.css';

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
                    <input type="text" id="inputFirstname" class="form-control" placeholder="First name" required />
                    <label for="inputFirstname">First Name</label>
                  </div>
                  <div class="form-label-group">
                    <input type="text" id="inputLastname" class="form-control" placeholder="Last name" required />
                    <label for="inputLastname">Last name</label>
                  </div>
                  <div class="form-label-group">
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                    <label for="inputEmail">Email address</label>
                  </div>
                  <div class="form-label-group">
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                    <label for="inputPassword">Password</label>
                  </div>
                  <div class="form-label-group">
                    <input type="radio" name="role" value="0" checked />Student<br/>
                    <input type="radio" name="role" value="1" />Instructor<br/>
                  </div>
                  <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign up</button>
                  <hr class="my-4" />
                </form>
                <button class="btn btn-lg btn-success btn-block text-uppercase" ><Link id="signin" to="/">Sign in</Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Registration;
