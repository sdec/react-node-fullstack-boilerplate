import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LinearProgress } from 'material-ui';

import * as postsActionCreators from '../ducks/posts';
import Posts from '../components/Posts';

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postsActions: bindActionCreators(postsActionCreators, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class BlogContainer extends React.Component {
  static propTypes = {
    postsActions: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { postsActions } = this.props;
    postsActions.fetchPosts();
  }

  render() {
    const { posts } = this.props;

    if (posts.loading) {
      return <LinearProgress color="secondary" />;
    }

    return <Posts posts={posts.items} />;
  }
}

export default BlogContainer;
