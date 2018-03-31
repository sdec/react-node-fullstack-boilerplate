import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Typography, withStyles } from 'material-ui';

import VerifiedUserIcon from 'material-ui-icons/VerifiedUser';

const styles = (theme) => ({
  root: {
    color: theme.palette.grey[300]
  },
  status: {
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    paddingRight: theme.spacing.unit
  },
  link: {
    '&, &:hover, &:active, &:focus, &:visited': {
      color: theme.palette.common.white,
      textDecoration: 'underline'
    }
  }
});

@withStyles(styles)
export class AccountMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired
  };

  static contextTypes = {
    intl: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  render() {
    const { intl } = this.context;
    const { classes, session } = this.props;

    if (!session.isLoggedIn()) {
      return (
        <div className={classes.root}>
          <Typography color="inherit">
            <span className={classes.status}>
              <FormattedMessage id="ACCOUNT.NOT_LOGGED_IN" defaultMessage="Hello, stranger." />
            </span>
            <span>
              <Link to={`/${intl.locale}/authenticate/login`} className={classes.link}>
                <FormattedMessage id="ACCOUNT.LOGIN" defaultMessage="Login" />
              </Link>&nbsp;
              <FormattedMessage id="COMMON.OR" defaultMessage="or" />&nbsp;
              <Link to={`/${intl.locale}/authenticate/signup`} className={classes.link}>
                <FormattedMessage id="ACCOUNT.SIGNUP" defaultMessage="Sign up" />
              </Link>
            </span>
          </Typography>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <Typography color="inherit" variant="caption">
          <span className={classes.status}>
            <FormattedMessage
              id="ACCOUNT.USER_GREETING"
              defaultMessage="Hi there, {user}."
              values={{
                user: session.toString()
              }}
            />
          </span>
          <span>
            <Link to={`/${intl.locale}/account`} className={classes.link}>
              <FormattedMessage id="ACCOUNT.MY_ACCOUNT" defaultMessage="My Account" />
            </Link>&nbsp;|&nbsp;
            <Link to={`/${intl.locale}/authenticate/logout`} className={classes.link}>
              <FormattedMessage id="ACCOUNT.LOGOUT" defaultMessage="Logout" />
            </Link>
          </span>
        </Typography>
      </div>
    );
  }
}
