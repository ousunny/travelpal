import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '550px',
    margin: '0 auto 5rem auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  heading: {
    padding: '2rem',
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    background: 'linear-gradient(225deg, #397dcf 0%, #428cd7 20%, #7bd1e3 100%)'
  },
  form: {
    padding: '1rem'
  },
  fields: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  buttonFullWidth: {
    width: '100%'
  },
  center: {
    margin: '0 auto',
    textAlign: 'center'
  }
}));

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/login" {...props} />
));

const Register = ({
  setAlert,
  register,
  auth: { isAuthenticated, user, loading }
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, username, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'error');
    } else {
      register({ firstName, lastName, username, password });
    }
  };

  if (isAuthenticated && !loading && user)
    return <Redirect to={`/profiles/${user._id}/trips`} />;

  return (
    <Paper className={classes.root}>
      <div className={classes.heading}>
        <Typography variant="h2">Register</Typography>
      </div>
      <form className={classes.form} onSubmit={e => onSubmit(e)}>
        <Grid container className={classes.fields} spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={e => onChange(e)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={e => onChange(e)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="username"
              placeholder="username"
              value={username}
              onChange={e => onChange(e)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="password"
              placeholder="password"
              value={password}
              onChange={e => onChange(e)}
              margin="normal"
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="password2"
              placeholder="Confirm password"
              value={password2}
              onChange={e => onChange(e)}
              margin="normal"
              type="password"
            />
          </Grid>
          <Grid item xs={12} className={classes.buttonFullWidth}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
              className={classes.buttonFullWidth}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Button component={CollisionLink}>Login</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
