import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActionCreators from '../../../../../store/session/session.duck';

import { Logout } from '../components/Logout';
import { SUCCESSES } from '../../../../../../../shared/modules/messages';
import { ERRORS } from '../../../../../../../shared/modules/messages/errors';

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
export class LogoutContainer extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    messageService: PropTypes.object.isRequired
  };

  static propTypes = {
    session: PropTypes.object.isRequired,
    sessionActions: PropTypes.object.isRequired
  };

  render() {
    return <Logout onRequestLogout={(payload) => this.handleRequestLogout(payload)} loading={this.props.session.loading} />;
  }

  handleRequestLogout() {
    return this.props.sessionActions
      .logout()
      .then((response) => this.handleLogoutSuccess(response))
      .catch((response) => this.handleLogoutFailure(response));
  }

  handleLogoutSuccess(response) {
    this.context.messageService.addMessage(SUCCESSES.USER_LOGGED_OUT);
    this.context.router.history.push(`/${this.context.intl.locale}/authenticate`);
    return Promise.resolve(response);
  }

  handleLogoutFailure(response) {
    this.context.messageService.addMessage(ERRORS.USER_LOGOUT_FAILED);
    this.context.router.history.push(`/${this.context.intl.locale}/authenticate`);
    return Promise.reject(response);
  }
}
