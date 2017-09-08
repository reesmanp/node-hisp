import React from 'react';
import { connect } from 'react-redux';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { auth as Actions } from '../actions';
import 'whatwg-fetch';

const mapStateToProps = (state, ownProps) => ({
  username: state.getIn(['auth', 'username']),
  password: state.getIn(['auth', 'password'])
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setUsername: u => {
    dispatch(Actions.setUsername(u));
  },
  setPassword: p => {
    dispatch(Actions.setPassword(p));
  },
  setJwt: j => {
    dispatch(Actions.setJwt(j));
  }
});

const styles = {
  padding: '20px'
};

async function auth (username, password, setJwt) {
  await fetch('/authenticate/signin', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(result => {
    if (result.status === 200) {
      setJwt(result.headers.get('authorization'));
      mui.overlay('off');
    }
  });
}

const loginForm = ({ username, password, setUsername, setPassword, setJwt }) => (
  <Form
    style={styles}
    onSubmit={evt => evt.preventDefault() & auth(username, password, setJwt)}>
    <legend>Login</legend>
    <Input
      hint='Username'
      onChange={evt => setUsername(evt.target.value)}/>
    <Input
      hint='Password'
      type='password'
      onChange={evt => setPassword(evt.target.value)}/>
    <Button
      variant='raised'
      color='primary'
      onClick={evt => evt.preventDefault() & auth(username, password, setJwt)}>Submit</Button>
  </Form>
);

export default connect(mapStateToProps, mapDispatchToProps)(loginForm);
