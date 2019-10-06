import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActionArea } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(3)
  }
}));

const ProfileTrip = ({
  trip: { _id, date, destination, title, description, members }
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea to={`/trips/${_id}`} component={Link}>
        <CardContent>
          <h3>{title}</h3>
          <p>
            <Moment format="YYYY-MM-DD">{date.start}</Moment> -{' '}
            <Moment format="YYYY-MM-DD">{date.end}</Moment>
          </p>
          <p>Destination: {destination}</p>
          <p>{description}</p>
          <p>{members.length} members currently going</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ProfileTrip.propTypes = {
  trip: PropTypes.object.isRequired
};

export default ProfileTrip;
