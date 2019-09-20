import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { CheckCircleOutline, ErrorOutline } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

const icons = {
  success: CheckCircleOutline,
  error: ErrorOutline
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  msg: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const Alert = ({ alerts }) => {
  const classes = useStyles();

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => {
      const Icon = icons[alert.alertType];
      return (
        <div key={alert.id}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            variant="error"
            open={true}
          >
            <SnackbarContent
              className={classes[alert.alertType]}
              message={
                <span className={classes.msg}>
                  <Icon className={classes.icon} />
                  {alert.msg}
                </span>
              }
            />
          </Snackbar>
        </div>
      );
    })
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
