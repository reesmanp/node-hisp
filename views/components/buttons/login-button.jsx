import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import LoginForm from '../loginForm';
import { auth as Actions } from '../../actions/index';
import styles from './login-button.css';
import 'whatwg-fetch'

const mapStateToProps = state => ({
  isAuthorized: !!state.getIn(['auth', 'jwt']),
  authorization: state.getIn(['auth', 'jwt']),
  username: state.getIn(['auth', 'username']),
  password: state.getIn(['auth', 'password'])
});

const mapDispatchToProps = dispatch => ({
  signout: () => {
    dispatch(Actions.signout());
  }
});

class LoginButton extends Component {
  static defaultProps = {
    className: ''
  };

  activateModal = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    const modalEl = document.createElement('div');
    modalEl.id = 'modalLogin';
    modalEl.style.width = '400px';
    modalEl.style.height = '300px';
    modalEl.style.margin = '100px auto';
    modalEl.style.backgroundColor = '#fff';

    //render(<LoginForm/>, modalEl);

    // show modal
    mui.overlay('on', modalEl);
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
      : this.activateModal()
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
