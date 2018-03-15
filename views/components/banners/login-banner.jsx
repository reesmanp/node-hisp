import React, { Component } from 'react';
import { connect } from 'react-redux';
import Appbar from 'muicss/lib/react/appbar';
import LoginButton from '../buttons/login-button';
import styles from './login-banner.css';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

/*
const banner = () => {
  const appBarHeight = 'mui--appbar-height mui--appbar-line-height';
  const styles = {
    padding: '5px'
  };

  return (
    <Appbar>
      <div className={appBarHeight} style={styles}>
        <Login loggedIn={false}/>
      </div>
    </Appbar>
  );
};
*/

class LoginBanner extends Component {
  render() {
    return (
      <Appbar className={this.props.className}>
        <LoginButton className='mui--pull-right'/>
      </Appbar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBanner);
