import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';
import { Meta } from './Meta';

const styles = (theme) => ({
  root: {}
});

@withStyles(styles)
export class BaseLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    locale: PropTypes.string
  };

  static contextTypes = {};

  render() {
    const { children, classes, locale } = this.props;

    return (
      <div className={classes.root}>
        <Meta locale={locale} />
        {children}
      </div>
    );
  }
}
