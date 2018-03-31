import * as React from 'react';

import { FormattedMessage } from 'react-intl';
import { FormHelperText } from 'material-ui';

export class FormValidations {
  _errors = [];
  _usedFields = [];

  constructor(errors) {
    this.errors = errors;
  }

  get errors() {
    return this._errors || [];
  }

  set errors(value) {
    this._errors = value;
  }

  get usedFields() {
    return this._usedFields;
  }

  set usedFields(value) {
    this._usedFields = value;
  }

  hasError(field) {
    const filteredErrors = this.getErrorsWithField(field);
    return Boolean(filteredErrors && filteredErrors.length);
  }

  getErrorsWithField(field) {
    let filteredErrors = null;

    this.errors.forEach((error) => {
      if (!field) {
        if (filteredErrors === null) {
          filteredErrors = [];
        }

        filteredErrors.push(error);
      } else if (error.field === field) {
        if (filteredErrors === null) {
          filteredErrors = [];
        }

        filteredErrors.push(error);
      }
    });

    return filteredErrors;
  }

  renderErrors(field) {
    const errors = this.getErrorsWithField(field);
    if (!errors || !errors.length) {
      return null;
    }

    return errors.map((error, idx) => {
      this._usedFields.push(error.field);

      return React.createElement(
        FormHelperText,
        {
          key: idx,
          component: 'div'
        },
        React.createElement(FormattedMessage, {
          id: error.code,
          defaultMessage: error.defaultMessage,
          values: error.values
        })
      );
    });
  }

  renderErrorsWithoutField(props = {}) {
    return this.errors
      .filter((error) => this._usedFields.filter((usedField) => usedField === error.field).length === 0)
      .map((error, idx) => {
        return React.createElement(
          FormHelperText,
          {
            key: idx,
            component: 'div',
            ...props
          },
          React.createElement(FormattedMessage, {
            id: error.code,
            defaultMessage: error.defaultMessage,
            values: error.values
          })
        );
      });
  }
}
