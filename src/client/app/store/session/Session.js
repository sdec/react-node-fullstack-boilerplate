import { defaults } from 'lodash';

export class Session {
  _identity;
  _token;

  constructor(sessionData) {
    const model = defaults(sessionData, { identity: undefined, token: undefined });

    this._identity = model.identity;
    this._token = model.token;
  }

  get identity() {
    return this._identity;
  }

  set identity(value) {
    this._identity = value;
  }

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  isLoggedIn() {
    return !!this.identity && !!this.token;
  }

  toString() {
    return `${this.identity.firstName}`;
  }
}
