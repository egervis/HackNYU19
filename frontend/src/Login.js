import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';

import Registration from './Registration';
import StudentHome from './student/home';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './styles/Login.css';

class Login extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
      super(props);

      const { cookies } = props;
      this.state = {
        name: cookies.get('name') || 'Ben'
      };
    }

    handleNameChange(name) {
      const { cookies } = this.props;

      cookies.set('name', name, { path: '/' });
      this.setState({ name });
    }
    render(){
      const { name } = this.state;

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
            <LoginForm name={name} onChange={this.handleNameChange.bind(this)}/>
            {this.state.name && <h1>Hello {this.state.name}!</h1>}
          </div>
        </div>
      )
    }
}

export default withCookies(Login);

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
