import * as React from 'react';

import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Fade, IconButton, Snackbar } from 'material-ui';
import CloseIcon from 'material-ui-icons/Close';

export class Messages extends React.Component {
  static propTypes = {};
  static contextTypes = {
    intl: PropTypes.object,
    messageService: PropTypes.object
  };

  messageService = undefined;
  onMessageAddedObserver;
  onMessageRemovedObserver;
  onMessagesClearedObserver;

  constructor(props, context) {
    super(props, context);

    this.messageService = this.context.messageService;
    this.state = {
      messages: this.messageService.messages
    };
  }

  componentWillMount() {
    this.onMessageAddedObserver = this.messageService.registerOnMessageAdded(() => this.updateMessages());
    this.onMessageRemovedObserver = this.messageService.registerOnMessageRemoved(() => this.updateMessages());
    this.onMessagesClearedObserver = this.messageService.registerOnMessagesCleared(() => this.updateMessages());
  }

  componentWillUnmount() {
    this.messageService.deRegisterOnMessageAdded(this.onMessageAddedObserver);
    this.messageService.deRegisterOnMessageRemoved(this.onMessageRemovedObserver);
    this.messageService.deRegisterOnMessagesCleared(this.onMessagesClearedObserver);
  }

  updateMessages() {
    this.setState({
      messages: this.messageService.messages
    });
  }

  render() {
    if (!this.state.messages.length) {
      return null;
    }

    return (
      <div>
        {this.state.messages.map((message, idx) => {
          return (
            <Snackbar
              key={idx}
              autoHideDuration={6000}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              open
              message={
                this.context.intl ? (
                  <FormattedMessage id={message.code} defaultMessage={message.defaultMessage} values={message.values} />
                ) : (
                  <span>{message.defaultMessage}</span>
                )
              }
              action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={(e) => this.handleClick(e, message)}>
                  <CloseIcon />
                </IconButton>
              ]}
              transition={Fade}
            />
          );
        })}
      </div>
    );
  }

  handleClick(e, message) {
    e.preventDefault();
    this.messageService.removeMessage(message);
  }
}
