import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  containerHorizontal: {
    display: 'flex'
  },
  actions: {
    margin: '1.5rem auto'
  },
  spacing: {
    margin: theme.spacing(1)
  },
  spacingLeft: {
    marginLeft: theme.spacing(1)
  }
}));

const CollisionLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/login" {...props} />
));

const Register = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <h1>Register</h1>
      <form className={classes.container}>
        <div className={classes.containerHorizontal}>
          <TextField
            required
            id="firstName"
            placeholder="First Name"
            margin="normal"
          />
          <TextField
            required
            id="lastName"
            placeholder="Last Name"
            margin="normal"
            className={classes.spacingLeft}
          />
        </div>
        <TextField
          required
          id="username"
          placeholder="username"
          margin="normal"
        />
        <div className={classes.containerHorizontal}>
          <TextField
            required
            id="password"
            placeholder="password"
            margin="normal"
            type="password"
          />
          <TextField
            required
            id="password2"
            placeholder="Confirm password"
            margin="normal"
            type="password"
            className={classes.spacingLeft}
          />
        </div>
        <div className={classes.actions}>
          <Link component={CollisionLink} className={classes.spacing}>
            Login
          </Link>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.spacing}
          >
            Register
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
