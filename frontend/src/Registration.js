import './styles/main.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { registerRequester } from './requests/requestBuilder';

export const Registration = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(0);
  const [regisFailed, showError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleRole = (e) => {
    setRole(e.target.value);
  }

  const handleRegister = (e) => {
    e.preventDefault();
    let data = [lastName, firstName, email, password];
    for(var d in data){
      if(data[d].length < 1){
        showError(true);
        return;
      }
    }
    registerRequester(role, lastName, firstName, email, password)
      .then(response => {
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  const invalidFormMessage = (
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <h4 class="alert-heading">Awe hell nah</h4>
      <p>Please fill out all fields before you submit.</p>
      <button type="button" class="close" onClick={() => showError(false)} data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )

  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h3 className="title text-center">Register an account</h3>
              {regisFailed ? invalidFormMessage : ''}
              <form className="form-signin">
                <div className="form-label-group">
                  <input type="text" id="inputFirstname" className="form-control" placeholder="First name" 
                    value={firstName} onChange={handleFirstNameChange} required autoFocus/>
                  <label htmlFor="inputFirstname">First Name</label>
                </div>
                <div className="form-label-group">
                  <input type="text" id="inputLastname" className="form-control" placeholder="Last name" 
                    value={lastName} onChange={handleLastNameChange} required />
                  <label htmlFor="inputLastname">Last name</label>
                </div>
                <div className="form-label-group">
                  <input type="email" id="inputEmail" className="form-control" placeholder="Email address" 
                    value={email} onChange={handleEmailChange} required />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <div className="form-label-group">
                  <input type="password" id="inputPassword" className="form-control" placeholder="Password" 
                    value={password} onChange={handlePasswordChange} required />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                <div className="form-group">
                  <select defaultValue='0' className="form-control" onChange={handleRole}>
                    <option value="0">I'm an instructor</option>
                    <option value="1">I'm a student</option>
                  </select>
                </div>
                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={handleRegister}>Sign up</button>
                <hr className="my-4" />
              </form>
              <Link id="signin" to="/"><button className="btn btn-lg btn-success btn-block text-uppercase" >Sign in</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
