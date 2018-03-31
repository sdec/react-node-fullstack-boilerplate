import React from 'react';
import { connect } from 'react-redux';
import { ChooseLanguage } from '../components/ChooseLanguage';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

@connect(mapStateToProps, mapDispatchToProps)
export class ChooseLanguageContainer extends React.Component {
  static propTypes = {};

  render() {
    return <ChooseLanguage />;
  }
}
