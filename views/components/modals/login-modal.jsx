import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modal as Actions } from '../../actions';
import styles from './login-modal.css';

const mapStateToProps = state => ({
  modalAction: state.getIn(['modal', 'action'])
});

const mapDispatchToProps = dispatch => ({
  modalOff: () => dispatch(Actions.modalOff())
});

class LoginModal extends Component {
  onClose = () => (
    this.props.modalOff()
  );

  renderModal = () => {
    const modalEl = document.createElement('div');
    modalEl.style.width = '400px';
    modalEl.style.height = '300px';
    modalEl.style.margin = '100px auto';
    modalEl.style.backgroundColor = '#fff';
    return modalEl;
  };

  render() {
    const options = {
      onclose: this.onClose
    };

    mui.overlay(this.props.modalAction, options, this.renderModal());

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
