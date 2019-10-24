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
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '550px'
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
  },
  buttonFullWidth: {
    width: '100%'
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
    <Paper className={classes.root}>
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
          <Grid item xs={12} className={classes.buttonFullWidth}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
              className={classes.buttonFullWidth}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button component={CollisionLink}>Register</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
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
