import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Grid, withStyles } from 'material-ui';

import banner from '../../../../assets/img/banner-white-smaller.png';

import { LocaleMenu } from '../modules/menu/components/LocaleMenu';
import { AccountMenuContainer } from '../modules/menu/containers/AccountMenuContainer';

const styles = (theme) => ({
  main: {
    [theme.breakpoints.up('sm')]: {
      marginTop: 32 + theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing.unit * 2
    }
  },
  top: {
    backgroundColor: theme.palette.primary.dark,

    [theme.breakpoints.up('sm')]: {
      position: 'fixed',
      left: 0,
      top: 0,
      right: 0,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit
    }
  },
  bannerImg: {
    display: 'inline-block',
    width: 209
  }
});
@withStyles(styles)
export class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node
  };

  static contextTypes = {
    intl: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  render() {
    const { intl, router } = this.context;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.top}>
          <Grid container spacing={0} justify="space-between" alignItems="center">
            <Grid item className={classes.secondaryLeftMenu}>
              <AccountMenuContainer />
            </Grid>
            <Grid item className={classes.secondaryRightMenu}>
              <LocaleMenu />
            </Grid>
          </Grid>
        </div>

        <div className={classes.main}>
          <Grid container>
            <Grid item xs>
              <Link to={`/${intl.locale}`}>
                <img src={banner} alt="Bootbase Banner" className={classes.bannerImg} />
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
