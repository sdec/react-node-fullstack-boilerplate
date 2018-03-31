import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';
import { BaseLayout } from '../../../shared/modules/layout/components/BaseLayout';
import { Header } from './Header';
import { Content } from '../../../shared/modules/layout/components/Content';
import { Footer } from '../../../shared/modules/layout/components/Footer';

const styles = (theme) => ({
  root: {}
});

@withStyles(styles)
export class LocalizedBasicLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired
  };

  static contextTypes = {
    intl: PropTypes.object.isRequired
  };

  render() {
    const { children, classes } = this.props;
    const { intl } = this.context;

    return (
      <BaseLayout locale={intl.locale}>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </BaseLayout>
    );
  }
}
