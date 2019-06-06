import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { loginRequester } from './requests/requestBuilder';
import './styles/main.css';

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
      setTimeout(()=>{this.props.history.push("/teacher/classes");}, 1000);
      console.log(localStorage);

    }

    render(){
      return(
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h3 className="title text-center">Sign In</h3>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <input type="email" id="inputEmail" className="form-control" placeholder="Email address" 
                        value={this.state.email} onChange={this.handleEmailChange} required autoFocus />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>
                    <div className="form-label-group">
                      <input type="password" id="inputPassword" className="form-control" placeholder="Password" 
                        value={this.state.password} onChange={this.handlePasswordChange} required />
                      <label htmlFor="inputPassword">Password</label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.handleLogin}>Sign in</button>
                    <hr className="my-4" />
                  </form>
                  <Link id="signup" to="/registration"><button className="btn btn-lg btn-success btn-block text-uppercase" >Sign up</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default Login;
