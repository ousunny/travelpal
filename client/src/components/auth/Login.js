import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '500px',
    margin: '0 auto'
  }
}));

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/register" {...props} />
));

const Login = ({ setAlert, login, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ username, password });
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <h1>Login</h1>
      <form onSubmit={e => onSubmit(e)}>
        <Grid container justify="center" alignItems="center" spacing={2}>
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
          <Grid item xs={12}>
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
          <Grid item xs={6}>
            <Button component={CollisionLink}>Register</Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, login }
)(Login);
