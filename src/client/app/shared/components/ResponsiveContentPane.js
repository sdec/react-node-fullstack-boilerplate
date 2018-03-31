import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 4
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit * 2
    }
  }
});

@withStyles(styles)
export class ResponsiveContentPane extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  };

  render() {
    const { classes, children } = this.props;
    return <div className={classes.root}>{children}</div>;
  }
}
