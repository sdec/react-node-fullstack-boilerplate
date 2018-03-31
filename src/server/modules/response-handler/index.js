import createPino from 'pino';

const pino = createPino({
  prettyPrint: true,
  enabled: true,
  messageKey: 'logMessage'
});

export * from './../../../shared/modules/messages';

export const mapToResponse = (httpStatusCode, messages = [], payload = {}, req) => {
  const messagesArray = !messages || !Array.isArray(messages) ? [messages] : messages;

  return {
    code: httpStatusCode.code,
    message: httpStatusCode.message,
    messages: messagesArray,
    payload,
    request: {
      body: req.body,
      cookies: req.cookies,
      files: req.files,
      headers: req.headers,
      httpVersion: req.httpVersion,
      httpVersionMajor: req.httpVersionMajor,
      httpVersionMinor: req.httpVersionMinor,
      method: req.method,
      originalUrl: req.originalUrl,
      params: req.params,
      query: req.query,
      url: req.url
    }
  };
};

export const sendResponse = (res, response) => {
  // Log anything that is a server error
  if (response.code >= 500) {
    pino.error(response, 'An internal error occurred');
  }

  res.status(response.code).json(response);
};

export const sendMessages = (req, res, httpStatusCode, messages = [], payload = {}) => {
  const response = mapToResponse(httpStatusCode, messages, payload, req);
  return sendResponse(res, response);
};

export const send = (req, res, httpStatusCode, payload = {}) => sendMessages(req, res, httpStatusCode, [], payload);
