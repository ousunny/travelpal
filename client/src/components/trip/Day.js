import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  paper: {},
  card: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1)
  },
  interested: {
    marginRight: theme.spacing(1),
    fontSize: '1.2rem'
  },
  icon: {
    minWidth: '0'
  }
}));

const Day = ({ day: { activities, date } }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={<Moment format="YYYY/MM/DD">{date}</Moment>} />
      <Paper>
        <List>
          {activities.length > 0 &&
            activities.map(activity => (
              <ListItem key={activity._id}>
                <ListItemText
                  primary={activity.title}
                  secondary={activity.description}
                />
                <div className={classes.interested}>
                  {activity.interested.length}
                </div>
                <ListItemIcon className={classes.icon}>
                  <ThumbUp />
                </ListItemIcon>
              </ListItem>
            ))}
        </List>
      </Paper>
    </Card>
  );
};

Day.propTypes = {
  day: PropTypes.object.isRequired
};

export default Day;
