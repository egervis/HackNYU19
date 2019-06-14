import './styles/main.css';

import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {loginRequester} from './requests/requestBuilder';

export const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, showError] = useState(false);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleLogin = e => {
    e.preventDefault();
    loginRequester(email, password)
      .then(res => {
        localStorage.setItem('userid', res.data.userid);
        localStorage.setItem('usertype', res.data.usertype);
        localStorage.setItem('firstname', res.data.firstname);
        localStorage.setItem('lastname', res.data.lastname);
        props.history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        showError(true);
      });
  };

  const loginErrorMessage = (
    <div
      className="alert alert-danger alert-dismissable fade show"
      role="alert"
    >
      Incorrect email or password. Please try again.
      <button
        type="button"
        className="close"
        onClick={() => showError(false)}
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h3 className="title text-center">Sign In</h3>
              {loginFailed ? loginErrorMessage : ''}
              <form className="form-signin">
                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    autoFocus
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
                <hr className="my-4" />
              </form>
              <Link id="signup" to="/registration">
                <button className="btn btn-lg btn-success btn-block text-uppercase">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
