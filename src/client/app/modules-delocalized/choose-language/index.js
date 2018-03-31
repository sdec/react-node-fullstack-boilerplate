import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router';
import { withStyles } from 'material-ui';

import { ChooseLanguageContainer } from './containers/ChooseLanguageContainer';
import { HeadlessLayout } from '../../shared/modules/layout/components/HeadlessLayout';

const styles = (theme) => ({});

@withStyles(styles)
export class ChooseLanguageRoute extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static contextTypes = {};

  render() {
    return (
      <div>
        <Switch>
          <Route>
            <HeadlessLayout>
              <ChooseLanguageContainer />
            </HeadlessLayout>
          </Route>
        </Switch>
      </div>
    );
  }
}
