import { APIService } from './APIService';

const api = new APIService('/auth/v1');

export class AuthAPIService {
  static loginLocal(payload) {
    return api.post('/local/login', payload);
  }

  static signupLocal(payload) {
    return api.post('/local/signup', payload);
  }

  static verifyToken(payload) {
    return api.post('/verify-token', payload);
  }

  static forgotPassword(payload) {
    return api.post('/forgot-password', payload);
  }

  static forgotPasswordReset(payload) {
    return api.post('/forgot-password/reset', payload);
  }

  static logout() {
    return api.post('/logout');
  }
}
