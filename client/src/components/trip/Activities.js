import React from 'react';
import PropTypes from 'prop-types';

import ActivityItem from './ActivityItem';

import { Paper, List } from '@material-ui/core';

const Activities = ({ activities }) => {
  return (
    <Paper>
      <List>
        {activities.length > 0 &&
          activities.map(activity => (
            <ActivityItem key={activity._id} activity={activity} />
          ))}
      </List>
    </Paper>
  );
};

Activities.propTypes = {
  activities: PropTypes.array.isRequired
};

export default Activities;