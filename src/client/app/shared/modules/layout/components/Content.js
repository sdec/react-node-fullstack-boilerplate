import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    minHeight: `calc(100vh - 132px - 136px)`
  }
});

@withStyles(styles)
export class Content extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired
  };

  static contextTypes = {};

  render() {
    const { classes, children } = this.props;
    return <div className={classes.root}>{children}</div>;
  }
}
