import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';
import { Content } from './Content';
import { Footer } from './Footer';
import { BaseLayout } from './BaseLayout';

const styles = (theme) => ({
  root: {}
});

@withStyles(styles)
export class HeadlessLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    locale: PropTypes.string
  };

  static contextTypes = {};

  render() {
    const { children, classes, locale } = this.props;

    return (
      <BaseLayout locale={locale}>
        <Content>{children}</Content>
        <Footer />
      </BaseLayout>
    );
  }
}
