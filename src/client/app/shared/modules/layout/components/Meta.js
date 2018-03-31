import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import { locales } from '../../../../i18n';

export class Meta extends React.Component {
  static propTypes = {
    locale: PropTypes.string
  };

  static contextTypes = {};

  render() {
    const locale = this.props.locale || locales[0].locale;

    return (
      <Helmet
        htmlAttributes={{
          lang: locale,
          'xml:lang': locale
        }}
      >
        <base href="/" />
        <meta httpEquiv="Content-Language" content={locale} />
      </Helmet>
    );
  }
}
