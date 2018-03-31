import { createAction, handleActions } from 'redux-actions';

// Actions
const POSTS_LOAD_REQUEST = 'react-node-fullstack-boilerplate/posts/POSTS_LOAD_REQUEST';
const POSTS_LOAD_SUCCESS = 'react-node-fullstack-boilerplate/posts/POSTS_LOAD_SUCCESS';
const POSTS_LOAD_FAILURE = 'react-node-fullstack-boilerplate/posts/POSTS_LOAD_FAILURE';

export const postsLoadRequestAction = createAction(POSTS_LOAD_REQUEST);
export const postsLoadSuccessAction = createAction(POSTS_LOAD_SUCCESS);
export const postsLoadFailureAction = createAction(POSTS_LOAD_FAILURE);

// Initial state
const defaultState = {
  loading: false,
  error: false,
  errorResponse: undefined,
  items: []
};

// Reducer
export default handleActions(
  {
    [POSTS_LOAD_REQUEST]: (state) => ({
      ...state,
      loading: true,
      error: false,
      errorResponse: undefined
    }),

    [POSTS_LOAD_SUCCESS]: (state, action) => {
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    },

    [POSTS_LOAD_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
      errorResponse: action.payload,
      items: []
    })
  },
  defaultState
);

// Action Creators
export function loadPostsRequest() {
  return postsLoadRequestAction();
}

export function loadPostsSuccess(posts) {
  return postsLoadSuccessAction(posts);
}

export function loadPostsFailure(error) {
  return postsLoadFailureAction(error);
}

// Selectors

// Thunks
export function fetchPosts() {
  return (dispatch) => {
    // Loading posts
    dispatch(loadPostsRequest());

    // Do async call
    return Promise.resolve([
      {
        id: '1',
        slug: 'building-a-react-universal-application',
        author: 'Sander Decoster',
        title: 'Building a React Universal application',
        content: 'content',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
      .then((response) => {
        // Posts loaded
        setTimeout(() => dispatch(loadPostsSuccess(response)), 500);
      })
      .catch((response) => {
        dispatch(loadPostsFailure(response));
      });
  };
}
