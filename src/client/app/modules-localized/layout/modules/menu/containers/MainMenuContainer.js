import React from 'react';
import { connect } from 'react-redux';
import { MainMenu } from '../components/MainMenu';
// import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

@connect(mapStateToProps, mapDispatchToProps)
export class MainMenuContainer extends React.Component {
  static contextTypes = {};

  componentWillMount() {}

  render() {
    return <MainMenu />;
  }
}
