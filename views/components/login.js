import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import LoginForm from './loginForm';
import { auth as Actions } from '../actions';
import 'whatwg-fetch'

const mapStateToProps = (state, ownProps) => ({
  isAuthorized: !!state.getIn(['auth', 'jwt']),
  authorization: state.getIn(['auth', 'jwt']),
  username: state.getIn(['auth', 'username']),
  password: state.getIn(['auth', 'password'])
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  signout: () => {
    dispatch(Actions.signout());
  }
});

function activateModal () {
  if (typeof window === 'undefined' || typeof document === 'undefined') { return }
  const modalEl = document.createElement('div');
  modalEl.id = 'modalLogin';
  modalEl.style.width = '400px';
  modalEl.style.height = '300px';
  modalEl.style.margin = '100px auto';
  modalEl.style.backgroundColor = '#fff';

  render(<LoginForm/>, modalEl);

  // show modal
  mui.overlay('on', modalEl);
}

function loggedIn (authHeader) {
  this.setState({
    loggedIn: true,
    authHeader: authHeader
  });
  mui.overlay('off');
}

async function sendSignout (authorization, logout) {
  await fetch('/authenticate/signout', {
    method: 'GET',
    headers: {
      'Authorization': authorization
    },
    credentials: 'include'
  }).then(result => {
    if (result.status === 200) {
      logout();
    }
  });
}

const authorizationButton = ({ isAuthorized, authorization, signout }) => (
  <Button
    className='mui--pull-right'
    variant='raised'
    onClick={isAuthorized ? sendSignout.bind(authorization, signout) : activateModal}>
    {
      isAuthorized ? 'Logout' : 'Login'
    }
  </Button>
);

export default connect(mapStateToProps, mapDispatchToProps)(authorizationButton);
