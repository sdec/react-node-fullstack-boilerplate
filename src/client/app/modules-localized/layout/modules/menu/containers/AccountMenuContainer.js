import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sessionActionCreators from '../../../../../store/session/session.duck';
import { sessionSelector } from '../../../../../store/session/session.selectors';

import { AccountMenu } from '../components/AccountMenu';

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sessionActions: bindActionCreators(sessionActionCreators, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export class AccountMenuContainer extends React.Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    sessionActions: PropTypes.object.isRequired
  };

  componentWillMount() {}

  render() {
    const session = sessionSelector(this.props.session);
    return <AccountMenu session={session} />;
  }
}
