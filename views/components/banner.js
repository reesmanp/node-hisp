import React from 'react';
import  { connect } from 'react-redux';
import Appbar from 'muicss/lib/react/appbar';
import Login from './login';

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

export default connect()(banner);
