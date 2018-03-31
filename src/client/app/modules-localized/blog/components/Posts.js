import React from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';

import { Button, Typography, withStyles } from 'material-ui';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  action: {
    marginTop: theme.spacing.unit * 3
  }
});

const Posts = ({ classes, posts }) => (
  <div>
    {posts.map((post) => (
      <div key={post.slug}>
        <Typography variant="title" color="secondary" gutterBottom>
          {post.title}
        </Typography>

        <Typography>
          <Truncate
            lines={2}
            ellipsis={
              <span>
                ... <Link to={`/blog/${post.slug}`}>read more</Link>
              </span>
            }
          >
            {post.content}
          </Truncate>
        </Typography>

        <div className={classes.action}>
          <Button variant="raised" size="small" color="primary" href={`/blog/${post.slug}`}>
            Read article
          </Button>
        </div>
      </div>
    ))}
  </div>
);

Posts.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
};

export default withStyles(styles)(Posts);
