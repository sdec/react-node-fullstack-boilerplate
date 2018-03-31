import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActionCreators from '../../../../../store/session/session.duck';

import { Signup } from '../components/Signup';
import { SUCCESSES } from '../../../../../../../shared/modules/messages';

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sessionActions: bindActionCreators(sessionActionCreators, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export class SignupContainer extends React.Component {
  static contextTypes = {
    messageService: PropTypes.object.isRequired
  };

  static propTypes = {
    session: PropTypes.object.isRequired,
    sessionActions: PropTypes.object.isRequired
  };

  render() {
    return <Signup onRequestSignupLocal={(payload) => this.handleRequestSignupLocal(payload)} loading={this.props.session.loading} />;
  }

  handleRequestSignupLocal(payload) {
    return this.props.sessionActions
      .signupLocal(payload)
      .then((response) => this.handleSignupSuccess(response))
      .catch((response) => this.handleSignupFailure(response));
  }

  handleSignupSuccess(response) {
    this.context.messageService.addMessage(SUCCESSES.USER_CREATED);
    return Promise.resolve(response);
  }

  handleSignupFailure(response) {
    // Validation messages shown @ SignupForm
    return Promise.reject(response);
  }
}
