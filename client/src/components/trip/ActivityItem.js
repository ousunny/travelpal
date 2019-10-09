import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  interested: {
    marginRight: theme.spacing(1),
    fontSize: '1.2rem'
  }
}));

const ActivityItem = ({ activity }) => {
  const classes = useStyles();

  return (
    <ListItem button>
      <ListItemText primary={activity.title} secondary={activity.description} />
      <div className={classes.interested}>{activity.interested.length}</div>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="interested">
          <ThumbUp />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.object.isRequired
};

export default ActivityItem;
