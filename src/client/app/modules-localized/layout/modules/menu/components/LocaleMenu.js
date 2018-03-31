import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FormattedMessage } from 'react-intl';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Typography, withStyles } from 'material-ui';
import { Manager, Popper, Target } from 'react-popper';

import LanguageIcon from 'material-ui-icons/Language';

import { Link } from 'react-router-dom';
import { locales } from '../../../../../i18n';

const styles = (theme) => ({
  root: {},
  localeItemClosed: {
    pointerEvents: 'none'
  },
  localeMenuButton: {
    color: theme.palette.common.white,
    height: 32
  },
  localeItemLocale: {
    marginRight: theme.spacing.unit,
    textTransform: 'uppercase',
    fontWeight: 500
  },
  currentLocale: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit,
    textTransform: 'uppercase',
    fontWeight: 500
  },
  label: {
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    paddingRight: theme.spacing.unit,
    color: theme.palette.grey[300]
  }
});

@withStyles(styles)
export class LocaleMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static contextTypes = {
    intl: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      localeMenuOpened: false
    };
  }

  render() {
    const { intl } = this.context;
    const { localeMenuOpened } = this.state;
    const { classes } = this.props;

    return (
      <Manager className={classes.root}>
        <Target>
          <Typography className={classes.label} variant="caption">
            <FormattedMessage id="HEADER.LANGUAGE" defaultMessage="Language" />
          </Typography>
          <IconButton
            className={classes.localeMenuButton}
            aria-owns={localeMenuOpened ? 'menu-list' : null}
            aria-haspopup="true"
            onClick={(e) => this.handleLocaleMenuClicked(e)}
          >
            <LanguageIcon />
            <Typography className={classes.currentLocale} variant="caption">
              {intl.locale}
            </Typography>
          </IconButton>
        </Target>
        <Popper
          placement="left-start"
          eventsEnabled={localeMenuOpened}
          className={classNames({ [classes.localeItemClosed]: !localeMenuOpened })}
        >
          <ClickAwayListener onClickAway={(e) => this.handleLocaleMenuClosed(e)}>
            <Grow in={localeMenuOpened} id="menu-list">
              <Paper>
                <MenuList role="menu">
                  {locales.map((localeItem, idx) => (
                    <MenuItem
                      key={idx}
                      selected={localeItem.locale === intl.locale}
                      onClick={(e) => this.handleLocaleMenuClosed(e)}
                      component={Link}
                      to={`/${localeItem.locale}`}
                    >
                      <span className={classes.localeItemLocale}>{localeItem.locale}</span>
                      <span>{localeItem.name}</span>
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    );
  }

  handleLocaleMenuClicked = (event) => {
    this.setState({ localeMenuOpened: true });
  };

  handleLocaleMenuClosed = () => {
    this.setState({ localeMenuOpened: false });
  };
}
