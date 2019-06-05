import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { loginRequester, registerRequester } from './requests/requestBuilder';
import './styles/Login.css';

class Login extends Component{
    constructor(props) {
      super(props);
      this.state = {
        email:'',
        password:''
      };

      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange =this.handlePasswordChange.bind(this);
      this.handleLogin =this.handleLogin.bind(this);
    }

    onSetResult = (result, key) => {
      localStorage.setItem(key, JSON.stringify(result.hits));
      this.setState({ hits: result.hits });
    }

    handleEmailChange(e){
      this.setState({email: e.target.value});
    }

    handlePasswordChange(e){
      this.setState({password: e.target.value});
    }

    handleLogin(e){
      console.log("Email: " + this.state.email);
      console.log("Password: " + this.state.password);

      loginRequester(this.state.email, this.state.password)
        .then(res => {

          localStorage.setItem('userid', res.data.userid);
          localStorage.setItem('usertype', res.data.usertype);
          localStorage.setItem('firstname', res.data.firstname);
          localStorage.setItem('lastname', res.data.lastname);
          console.log(res.status);
          return res;
        })
        .catch(err => {
          console.log(err);
        });
      setTimeout(()=>{this.props.history.push("/teacher/allClasses");}, 1000);
      console.log(localStorage);

    }

    render(){
      return(
        <div class="container">
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div class="card card-signin my-5">
                <div class="card-body">
                  <h3 class="card-title text-center">Sign In</h3>
                  <form class="form-signin">
                    <div class="form-label-group">
                      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                      <label for="inputEmail">Email address</label>
                    </div>

                    <div class="form-label-group">
                      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                      <label for="inputPassword">Password</label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                    <hr class="my-4" />
                  <button class="btn btn-lg btn-success btn-block text-uppercase"><a id= "signup" href="#">Sign up</a></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default Login;
