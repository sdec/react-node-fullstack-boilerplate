import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route, Switch } from 'react-router';
import { withStyles } from 'material-ui';

import { AuthenticateContainer } from './containers/AuthenticateContainer';

const styles = (theme) => ({});

@withStyles(styles)
export class AuthenticateRoute extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static contextTypes = {};

  render() {
    return <AuthenticateContainer />;
  }
}
