import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An email was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2 class="pb-3">Login</h2>
        <div class="form-group">
          <label for="emailInput">Email address</label>
          <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Your email"/>
        </div>
        <div class="form-group">
          <label for="pwInput">Password</label>
          <input type="password" class="form-control" id="pwInput" placeholder="Password"/>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="remember"/>
          <label class="form-check-label" for="remember">Remember me</label>
        </div>
        <button type="submit" class="btn btn-success mt-3">Login</button>
      </form>
    )
  }
}
