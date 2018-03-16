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
    const bannerClass = `${styles.appBar} ${this.props.className}`;
    const leftClass = `${styles.pullLeft} mui--pull-left`;
    const rightClass = 'mui--pull-right';

    return (
      <Appbar className={bannerClass}>
        <h2 className={leftClass}>Node HISP</h2>
        <LoginButton className={rightClass}/>
      </Appbar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBanner);
