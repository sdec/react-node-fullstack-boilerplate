export class MessageService {
  MESSAGE_SHOW_DURATION = 5000;

  _messages;
  _observers;
  _clearMessagesTimer;

  constructor() {
    this._messages = [];
    this._observers = {
      onMessageAdded: [],
      onMessageRemoved: [],
      onMessagesCleared: []
    };
    this._clearMessagesTimer = undefined;
  }

  addMessage(message) {
    message.id = this._messages.length;

    // Only 1 message at a time for now (no support for stackable snackbars)
    this.clearMessages();

    this._messages.push(message);
    this._observers.onMessageAdded.forEach((observer) => observer(message));

    if (this._clearMessagesTimer) {
      clearTimeout(this._clearMessagesTimer);
    }

    this._clearMessagesTimer = setTimeout(() => {
      this.clearMessages();
    }, this.MESSAGE_SHOW_DURATION);

    return message;
  }

  addMessages(messages) {
    messages.forEach((message) => {
      this.addMessage(message);
    });
  }

  removeMessage(message) {
    for (let i = 0; i < this._messages.length; i++) {
      if (this._messages[i].id === message.id) {
        this._messages.splice(i, 1);
        this._observers.onMessageRemoved.forEach((observer) => observer(message));
      }
    }
  }

  clearMessages() {
    this._clearMessagesTimer = undefined;
    this._messages = [];
    this._observers.onMessagesCleared.forEach((observer) => observer());
  }

  registerOnMessageAdded(cb) {
    cb.id = this._observers.onMessageAdded.length;
    this._observers.onMessageAdded.push(cb);
    return cb.id;
  }

  deRegisterOnMessageAdded(id) {
    for (let i = 0; i < this._observers.onMessageAdded.length; i++) {
      if (this._observers.onMessageAdded[i].id === id) {
        this._observers.onMessageAdded.splice(i, 1);
      }
    }
  }

  registerOnMessageRemoved(cb) {
    cb.id = this._observers.onMessageRemoved.length;
    this._observers.onMessageRemoved.push(cb);
    return cb.id;
  }

  deRegisterOnMessageRemoved(id) {
    // Check if the message was added before
    /* tslint:disable prefer-for-of */
    for (let i = 0; i < this._observers.onMessageRemoved.length; i++) {
      if (this._observers.onMessageRemoved[i].id === id) {
        this._observers.onMessageRemoved.splice(i, 1);
      }
    }
    /* tslint:enable prefer-for-of */
  }

  registerOnMessagesCleared(cb) {
    cb.id = this._observers.onMessagesCleared.length;
    this._observers.onMessagesCleared.push(cb);
    return cb.id;
  }

  deRegisterOnMessagesCleared(id) {
    // Check if the message was added before
    /* tslint:disable prefer-for-of */
    for (let i = 0; i < this._observers.onMessagesCleared.length; i++) {
      if (this._observers.onMessagesCleared[i].id === id) {
        this._observers.onMessagesCleared.splice(i, 1);
      }
    }
    /* tslint:enable prefer-for-of */
  }

  get messages() {
    return this._messages;
  }

  get observers() {
    return this._observers;
  }
}
