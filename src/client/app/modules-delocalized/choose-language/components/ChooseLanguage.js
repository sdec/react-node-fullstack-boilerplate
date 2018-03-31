import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, Grid, Typography, withStyles } from 'material-ui';

import { ResponsiveContentPane } from '../../../shared/components/ResponsiveContentPane';
import banner from '../../../../assets/img/banner-blue-smaller.jpg';
import { locales } from '../../../i18n';

const styles = (theme) => ({
  title: {
    marginBottom: theme.spacing.unit * 4
  },
  button: {
    width: '100%'
  },
  bannerImg: {
    width: 209
  }
});

@withStyles(styles)
export class ChooseLanguage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static contextTypes = {};

  render() {
    const { classes } = this.props;

    return (
      <ResponsiveContentPane>
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography variant="display2" align="center" className={classes.title}>
              <img src={banner} alt="Bootbase Banner" className={classes.bannerImg} />
            </Typography>

            <Grid container>
              {locales.map((localeItem, idx) => {
                return (
                  <Grid item xs={12} key={idx}>
                    <Button
                      component={Link}
                      color="primary"
                      variant="raised"
                      size="medium"
                      className={classes.button}
                      to={`/${localeItem.locale}`}
                      aria-label={localeItem.name}
                    >
                      {localeItem.buttonText}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </ResponsiveContentPane>
    );
  }
}
