import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '500px',
    margin: '0 auto'
  }
}));

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/login" {...props} />
));

const Register = ({ setAlert, register }) => {
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

  return (
    <div className={classes.root}>
      <h1>Register</h1>
      <form onSubmit={e => onSubmit(e)}>
        <Grid container justify="center" alignItems="center" spacing={2}>
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
          <Grid item xs={6}>
            <Button component={CollisionLink}>Login</Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, register }
)(Register);
