import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

import { Grid, Button } from '@material-ui/core';

const Profile = ({ logout }) => {
  return (
    <Fragment>
      <h1>Profile</h1>
      <Grid container>
        <Grid item xs={12}>
          <Button onClick={logout} to="/" component={Link}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

Profile.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(Profile);
