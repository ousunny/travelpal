import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import Activities from './Activities';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1)
  }
}));

const Day = ({ day: { activities, date } }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={<Moment format="YYYY/MM/DD">{date}</Moment>} />
      <Activities activities={activities} />
    </Card>
  );
};

Day.propTypes = {
  day: PropTypes.object.isRequired
};

export default Day;
