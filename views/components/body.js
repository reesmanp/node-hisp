import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isAuthorized: !!state.getIn(['auth', 'jwt'])
});

const body = ({ isAuthorized }) => {
  if (!isAuthorized) {
    const line1 = 'mui--text-display2 mui--text-center mui--align-middle';
    const line2 = 'mui--text-headline mui--text-center mui--align-middle';
    return (
      <div>
        <div className={line1}>Welcome to Node HISP</div>
        <div className={line2}>You are logged out, please login</div>
      </div>
    );
  }
};

export default connect(mapStateToProps)(body);
