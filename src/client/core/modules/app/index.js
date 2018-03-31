import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import { withStyles } from 'material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Routing } from './components/Routing';
import { generateGlobalStyles } from '../../../app/theming';
import { ERRORS, SUCCESSES } from '../../../../shared/modules/messages';
import { sessionSelector } from '../../../app/store/session/session.selectors';
import * as sessionActionCreators from '../../../app/store/session/session.duck';
import { MessageService } from './services/message.service';

const styles = (theme) => ({
  '@global': generateGlobalStyles(theme)
});

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

class AppRouteClass extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    session: PropTypes.object.isRequired,
    sessionActions: PropTypes.object.isRequired
  };

  static childContextTypes = {
    messageService: PropTypes.object
  };

  messageService = new MessageService();
  requestInterceptor;
  responseInterceptor;

  constructor(props, context) {
    super(props, context);

    // Intercept HTTP requests
    this.requestInterceptor = axios.interceptors.request.use(
      (config) => this.handlePostRequest(config),
      (error) => this.handleRequestError(error)
    );

    // Intercept HTTP responses
    this.responseInterceptor = axios.interceptors.response.use(
      (response) => this.handleResponse(response),
      (error) => this.handleResponseError(error)
    );
  }

  getChildContext() {
    return {
      messageService: this.messageService
    };
  }

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    // If we are logged in, check if JWT is still valid
    this.props.sessionActions.verifyToken().then((isTokenValid) => {
      if (!isTokenValid) {
        this.invalidateSession();
      }
    });
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.requestInterceptor);
    axios.interceptors.request.eject(this.responseInterceptor);
  }

  render() {
    return <Routing />;
  }

  handlePostRequest(config) {
    const session = sessionSelector(this.props.session);

    // Send JWT if user is logged in
    if (session.isLoggedIn()) {
      const accessToken = `Bearer ${session.token}`;

      // Append access token to each request
      if (accessToken) {
        config.headers['Authorization'] = accessToken;
      }
    }

    return config;
  }

  handleRequestError(error) {
    return Promise.reject(this.mapAxiosError(error));
  }

  handleResponse(response) {
    return response;
  }

  // On response error
  handleResponseError(error) {
    return Promise.reject(this.mapAxiosError(error));
  }

  mapAxiosError(error) {
    const defaultError = {
      code: 500,
      message: 'Internal server error',
      payload: {}
    };

    let mappedError = defaultError;
    if (error.response && error.response.data) {
      mappedError = {
        code: error.response.code,
        message: error.response.statusText,
        payload: error.response.data
      };

      // Response does not come from the API
      if (error.response.data.messages) {
        mappedError = { ...mappedError, ...error.response.data };
      } else {
        mappedError = { ...mappedError, messages: [ERRORS.GENERAL_ERROR] };
      }
    }

    return mappedError;
  }

  invalidateSession() {
    return this.props.sessionActions
      .logout()
      .then((response) => this.handleLogoutSuccess(response))
      .catch((response) => this.handleLogoutFailure(response));
  }

  handleLogoutSuccess(response) {
    return Promise.resolve(response);
  }

  handleLogoutFailure(response) {
    this.messageService.addMessage(ERRORS.USER_LOGOUT_FAILED);
    return Promise.reject(response);
  }
}

export const AppRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppRouteClass)));
