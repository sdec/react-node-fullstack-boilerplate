import React from 'react';
import PropTypes from 'prop-types';

import { Typography, withStyles } from 'material-ui';

const styles = (theme) => ({
  root: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.common.white
  },
  link: {
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  text: {
    fontSize: 12
  }
});

@withStyles(styles)
export class Footer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography align="center" color="inherit" className={classes.text}>
          This is the footer
        </Typography>
        <Typography align="center" color="inherit" className={classes.text}>
          Contact information comes here:
          <a href="mailto:contact@myapp.com" className={classes.link}>
            contact@myapp.com
          </a>
        </Typography>
      </div>
    );
  }
}
