import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui';

import { ResponsiveContentPane } from '../../../../../shared/components/ResponsiveContentPane';
import { Loading } from '../../../../../shared/components/Loading';

const styles = (theme) => ({});

@withStyles(styles)
export class Logout extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestLogout: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  logoutTimeout;

  componentDidMount() {
    this.logoutTimeout = setTimeout(() => this.handleRequestLogout(), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.logoutTimeout);
  }

  render() {
    const { intl } = this.context;
    const { classes } = this.props;

    return (
      <ResponsiveContentPane>
        <Loading
          title={<FormattedMessage id="ACCOUNT.LOGOUT_TITLE" defaultMessage="Logging out" />}
          content={
            <FormattedMessage id="ACCOUNT.LOGOUT_SUBTITLE" defaultMessage="Please wait while you are being logged out of your account..." />
          }
          CancelButtonProps={{
            component: Link,
            to: `/${intl.locale}`
          }}
        />
      </ResponsiveContentPane>
    );
  }

  handleRequestLogout() {
    return this.props.onRequestLogout();
  }
}
