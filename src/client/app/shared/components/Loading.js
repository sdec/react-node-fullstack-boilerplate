import React from 'react';
import PropTypes from 'prop-types';

import { Button, Grid, LinearProgress, Typography, withStyles } from 'material-ui';
import { FormattedMessage } from 'react-intl';

const styles = (theme) => ({
  cancel: {
    marginTop: theme.spacing.unit * 2
  }
});

@withStyles(styles)
export class Loading extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.element,
    content: PropTypes.element,
    CancelButtonProps: PropTypes.shape({
      to: PropTypes.string,
      component: PropTypes.func
    })
  };

  render() {
    const { classes, title, content, CancelButtonProps } = this.props;

    let titleContent = '';
    let contentContent = '';
    let cancelContent = '';

    if (title) {
      titleContent = (
        <Typography variant="headline" gutterBottom={!!content || !!CancelButtonProps}>
          {title}
        </Typography>
      );
    }

    if (content) {
      contentContent = <Typography gutterBottom={!!CancelButtonProps}>{content}</Typography>;
    }

    if (CancelButtonProps) {
      cancelContent = (
        <div>
          <Button id="cancel" name="cancel" variant="raised" className={classes.cancel} {...CancelButtonProps}>
            <FormattedMessage id="COMMON.CANCEL" defaultMessage="Cancel" />
          </Button>
        </div>
      );
    }

    return (
      <Grid container justify="center" alignItems="center" alignContent="center">
        <Grid item md={6} sm={8} xs={12}>
          {titleContent}
          {contentContent}
          <LinearProgress />
          {cancelContent}
        </Grid>
      </Grid>
    );
  }
}
