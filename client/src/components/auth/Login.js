import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  actions: {
    margin: '1.5rem auto'
  },
  spacing: {
    margin: theme.spacing(1)
  }
}));

const CollisionLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/register" {...props} />
));

const Login = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <h1>Login</h1>
      <form className={classes.container}>
        <TextField id="username" placeholder="username" margin="normal" />
        <TextField
          id="password"
          placeholder="password"
          margin="normal"
          type="password"
        />
        <div className={classes.actions}>
          <Link component={CollisionLink} className={classes.spacing}>
            Register
          </Link>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.spacing}
          >
            Login
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
