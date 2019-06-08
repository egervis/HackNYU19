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
    registerRequester(this.state.role, this.state.lastName, this.state.firstName, this.state.email, this.state.password)
      .then(response => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h3 className="title text-center">Register an account</h3>
                <form className="form-signin">
                  <div className="form-label-group">
                    <input type="text" id="inputFirstname" className="form-control" placeholder="First name" 
                      value={this.state.firstName} onChange={this.handleFirstNameChange} required />
                    <label htmlFor="inputFirstname">First Name</label>
                  </div>
                  <div className="form-label-group">
                    <input type="text" id="inputLastname" className="form-control" placeholder="Last name" 
                      value={this.state.lastName} onChange={this.handleLastNameChange} required />
                    <label htmlFor="inputLastname">Last name</label>
                  </div>
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
                  <div className="form-group">
                    <select defaultValue='0' className="form-control" onChange={this.handleRole}>
                      <option value="0">I'm an instructor</option>
                      <option value="1">I'm a student</option>
                    </select>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.handleRegister}>Sign up</button>
                  <hr className="my-4" />
                </form>
                <Link id="signin" to="/"><button className="btn btn-lg btn-success btn-block text-uppercase" >Sign in</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Registration;
