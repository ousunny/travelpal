import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, List, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1)
  },
  card: {
    marginBottom: theme.spacing(1)
  }
}));

const Day = ({ day: { activities, date } }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h5>{date}</h5>
      <List>
        {activities.length > 0 &&
          activities.map(activity => (
            <Card className={classes.card} key={activity._id}>
              <CardContent>
                <h6>{activity.title}</h6>
              </CardContent>
            </Card>
          ))}
      </List>
    </Paper>
  );
};

Day.propTypes = {
  day: PropTypes.object.isRequired
};

export default Day;
