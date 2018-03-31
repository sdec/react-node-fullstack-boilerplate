import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';

const styles = (theme) => ({});

@withStyles(styles)
export class MainMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static contextTypes = {
    intl: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  render() {
    const { intl, router } = this.context;
    const { classes } = this.props;

    return <div />;
  }
}
