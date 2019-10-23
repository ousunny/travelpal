import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px'
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
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/register" {...props} />
));

const Login = ({ setAlert, login, auth: { isAuthenticated, user } }) => {
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

  if (isAuthenticated && user)
    return <Redirect to={`/profiles/${user._id}/trips`} />;

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <Typography variant="h2">Login</Typography>
      </div>
      <form className={classes.form} onSubmit={e => onSubmit(e)}>
        <Grid container className={classes.fields} spacing={3}>
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
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button component={CollisionLink}>Register</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert, login }
)(Login);
