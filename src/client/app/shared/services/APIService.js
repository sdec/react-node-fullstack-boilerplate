import axios from 'axios';
import { ERRORS } from '../../../../shared/modules/messages';

export class APIService {
  apiUrl = '/api';

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  get(url = '') {
    return axios.post(this._url(url));
  }

  post(url = '', data = {}) {
    return axios.post(this._url(url), data);
  }

  put(url = '', data = {}) {
    return axios.put(this._url(url), data);
  }

  delete(url = '') {
    return axios.delete(this._url(url));
  }

  _url(path = '') {
    return `${this.apiUrl}${path}`;
  }

  static isValidAPIErrorResponse(error) {
    return error && error.code && error.message && error.messages;
  }

  static mapAPIErrorToMessages(error) {
    if (!APIService.isValidAPIErrorResponse(error)) {
      return [ERRORS.GENERAL_ERROR];
    }

    let messages = [];

    // If payload contains validation errors, add these aswel
    const validationErrorMessages = error.messages.filter((message) => message.code === ERRORS.VALIDATION_ERRORS.code);
    if (validationErrorMessages.length && Array.isArray(error.payload)) {
      // Clear the root validation message
      error.messages = error.messages.filter((message) => message.code !== ERRORS.VALIDATION_ERRORS.code);

      messages = messages.concat(
        error.payload.map((validationError) => ({
          field: validationError.field,
          ...validationError.message
        }))
      );
    }

    messages = messages.concat(error.messages);
    return messages;
  }
}
