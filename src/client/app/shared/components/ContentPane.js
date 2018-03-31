import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, withTheme } from 'material-ui';

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit * 2
  }
});

@withStyles(styles)
@withTheme()
export class ContentPane extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    theme: PropTypes.object.isRequired,
    border: PropTypes.bool
  };

  static defaultPropTypes = {
    border: false
  };

  render() {
    const { classes, children, theme } = this.props;
    const propStyles = {
      root: {
        border: this.props.border ? `solid 1px ${theme.palette.text.hint}` : undefined
      }
    };

    return (
      <div className={classes.root} style={propStyles.root}>
        {children}
      </div>
    );
  }
}
