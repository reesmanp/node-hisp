import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginBanner from '../banners/login-banner';
import LoginButton from '../buttons/login-button';
import styles from './login.page.css';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

class LoginPage extends Component {
  renderPreLogin = () => (
    <div>
      <div className='mui--text-display2 mui--text-center mui--align-middle'>
        Welcome to Node HISP
      </div>
      <div className='mui--text-headline mui--text-center mui--align-middle'>
        Please login to continue
      </div>
    </div>
  );

  render() {
    return (
      <div className={styles.loginPage}>
        <LoginBanner/>
        {this.renderPreLogin()}
        <LoginButton className={styles.loginPageCenterItem}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
