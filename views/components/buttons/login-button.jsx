import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import LoginForm from '../loginForm';
import { auth, modal } from '../../actions/index';
import styles from './login-button.css';
import 'whatwg-fetch'

const mapStateToProps = state => ({
  isAuthorized: !!state.getIn(['auth', 'jwt']),
  authorization: state.getIn(['auth', 'jwt']),
  username: state.getIn(['auth', 'username']),
  password: state.getIn(['auth', 'password'])
});

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(auth.signout()),
  modalOn: () => dispatch(modal.modalOn())
});

class LoginButton extends Component {
  static defaultProps = {
    className: ''
  };

  sendSignout = () => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': this.props.authorization
      },
      credentials: 'include'
    };

    fetch('/authenticate/signout', fetchOptions)
      .then(() => this.props.signout());
  };

  onClick = () => (
    this.props.isAuthorized
      ? this.sendSignout()
      : this.props.modalOn()
  );

  render() {
    const classNames = `${styles.loginButton} ${this.props.className}`;

    return (
      <Button className={classNames} variant='raised' onClick={this.onClick}>
        { this.props.isAuthorized ? 'Logout' : 'Login' }
      </Button>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
