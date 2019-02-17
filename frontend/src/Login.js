import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';

import Registration from './Registration';
import StudentHome from './student/home';

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

    onSearch = (e) => {
      console.log("Search");
      e.preventDefault();
      //
      // if (value === '') {
      //   return;
      // }

      const target = e.target;
      const email = target.type === 'email' ? this.value : target.name;

      console.log(email);

      // const cachedHits = localStorage.getItem(value);
      // if (cachedHits) {
      //   this.setState({ hits: JSON.parse(cachedHits) });
      //   return;
      // }
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
          console.log(res);
          localStorage.setItem('userid', res.data.userid);
          localStorage.setItem('usertype', res.data.usertype);
          localStorage.setItem('firstname', res.data.firstname);
          localStorage.setItem('lastname', res.data.lastname);
          return res;
        })
        .catch(err => {
          console.log(err);
        });

      console.log(localStorage);

    }

    render(){
      return(
        <div className="Login">
          <nav class="navbar navbar-expand-md bg-dark navbar-dark py-2">
             <a class="navbar-brand">Company Name</a>
             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
               <span class="navbar-toggler-icon"></span>
             </button>
             <div class="collapse navbar-collapse" id="collapsibleNavbar">
               <ul class="navbar-nav ml-auto">
                 <li class="nav-item">
                   <Link to="/registration" class="nav-link">Registration</Link>
                 </li>
                 <li class="nav-item">
                   <Link to="/" class="nav-link">Contact Us</Link>
                 </li>
                 <li class="nav-item">
                   <Link to="/teacher/class" class="nav-link">Teacher</Link>
                 </li>
                 <li class="nav-item">
                   <Link to="/student/home" class="nav-link">Student</Link>
                 </li>
               </ul>
             </div>
          </nav>

          <h1 class="mt-5 pt-3">We're here to help you learn!</h1>
          <div class="container-fluid w-25 jumbotron mt-5 bg-dark">

          <form>
            <h2 class="pb-3">Login</h2>
            <div class="form-group">
              <label for="emailInput">Email address</label>
              <input name="email" type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Your email"
                  value={this.state.email} onChange={this.handleEmailChange}/>
            </div>
            <div class="form-group">
              <label for="pwInput">Password</label>
              <input name="password" type="password" class="form-control" id="pwInput" placeholder="Password"
                  value={this.state.password} onChange={this.handlePasswordChange}/>
            </div>
            <button type="button" class="btn btn-success mt-3" onClick={this.handleLogin}>Login</button>
          </form>
          {
            this.state.hits &&
            this.state.hits.map(item => <div key={item.objectID}>{item.title}</div>)
          }
          </div>
        </div>
      )
    }
}

export default Login;

// <form>
//   <h2 class="pb-3">Login</h2>
//   <div class="form-group">
//     <label for="emailInput">Email address</label>
//     <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Your email"/>
//   </div>
//   <div class="form-group">
//     <label for="pwInput">Password</label>
//     <input type="password" class="form-control" id="pwInput" placeholder="Password"/>
//   </div>
//   <div class="form-check">
//     <input type="checkbox" class="form-check-input" id="remember"/>
//     <label class="form-check-label" for="remember">Remember me</label>
//   </div>
//   <button type="submit" class="btn btn-success mt-3">Login</button>
// </form>

// <form onSubmit={this.onSearch}>
//   <input type="text" ref={node => this.input = node} />
//   <input type="submit">Submit</input>
// </form>
