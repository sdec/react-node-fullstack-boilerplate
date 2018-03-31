import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route, Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sessionActionCreators from '../../../store';
import { sessionSelector } from './../../../store/session/session.selectors';

import { SignupRoute } from '../modules/signup';
import { LoginRoute } from '../modules/login';
import { ForgotPasswordRoute } from '../modules/forgot-password';
import { LogoutRoute } from '../modules/logout';

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

class AuthenticateContainerClass extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
    messageService: PropTypes.object.isRequired
  };

  static propTypes = {
    session: PropTypes.object.isRequired,
    sessionActions: PropTypes.object.isRequired
  };

  render() {
    const { intl } = this.context;
    const session = sessionSelector(this.props.session);

    if (session.isLoggedIn()) {
      return (
        <Switch>
          <Route path={`/${intl.locale}/authenticate/logout`} exact component={LogoutRoute} />

          <Redirect to={`/${intl.locale}/account`} />
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path={`/${intl.locale}/authenticate/signup`} exact component={SignupRoute} />
        <Route path={`/${intl.locale}/authenticate/login`} exact component={LoginRoute} />
        <Route path={`/${intl.locale}/authenticate/forgot-password`} component={ForgotPasswordRoute} />

        <Redirect to={`/${intl.locale}/authenticate/login`} />
      </Switch>
    );
  }
}

export const AuthenticateContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainerClass));
