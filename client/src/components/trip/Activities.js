import React from 'react';
import PropTypes from 'prop-types';

import ActivityItem from './ActivityItem';

import { Paper, List } from '@material-ui/core';

const Activities = ({ tripId, activities }) => {
  return (
    <Paper>
      {activities.length > 0 && (
        <List>
          {activities.map(activity => (
            <ActivityItem
              key={activity._id}
              tripId={tripId}
              activity={activity}
            />
          ))}
        </List>
      )}
    </Paper>
  );
};

Activities.propTypes = {
  activities: PropTypes.array.isRequired
};

export default Activities;
