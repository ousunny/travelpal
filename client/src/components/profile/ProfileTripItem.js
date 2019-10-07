import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea
} from '@material-ui/core';

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
        <CardHeader
          title={title}
          subheader={
            <Fragment>
              <Moment format="YYYY-MM-DD">{date.start}</Moment> -{' '}
              <Moment format="YYYY-MM-DD">{date.end}</Moment>
              <div>{destination}</div>
              <div>{members.length} members currently going</div>
            </Fragment>
          }
        />
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ProfileTrip.propTypes = {
  trip: PropTypes.object.isRequired
};

export default ProfileTrip;
