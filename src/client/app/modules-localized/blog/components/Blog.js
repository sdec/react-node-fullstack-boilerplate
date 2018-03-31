import React from 'react';
import PropTypes from 'prop-types';

import { Typography, withStyles } from 'material-ui';

import PostsContainer from '../containers/PostsContainer';
import { ResponsiveContentPane } from '../../../shared/components/ResponsiveContentPane';

const styles = (theme) => ({
  title: {
    marginBottom: theme.spacing.unit * 4
  }
});

const Blog = ({ classes }) => (
  <ResponsiveContentPane>
    <div className={classes.title}>
      <Typography variant="headline" color="primary">
        Blog page
      </Typography>
      <Typography variant="subheading">Read it and weep</Typography>
    </div>
    <PostsContainer />
  </ResponsiveContentPane>
);

Blog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Blog);
