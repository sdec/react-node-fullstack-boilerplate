import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route, Switch } from 'react-router';
import { withStyles } from 'material-ui';

import Blog from './components/Blog';

const styles = (theme) => ({});

const BlogRoute = ({ classes }) => (
  <div>
    <Switch>
      <Route>
        <Blog />
      </Route>

      <Redirect to="/blog" />
    </Switch>
  </div>
);

BlogRoute.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BlogRoute);
