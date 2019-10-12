import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import Activities from './Activities';
import ActivityCreate from './ActivityCreate';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, IconButton } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1)
  }
}));

const Day = ({ tripId, day: { activities, date } }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton onClick={handleClickOpen}>
              <AddCircleOutline />
            </IconButton>
          }
          title={<Moment format="YYYY/MM/DD">{date}</Moment>}
        />
        <Activities tripId={tripId} activities={activities} />
      </Card>
      <ActivityCreate
        open={open}
        onClose={handleClose}
        tripId={tripId}
        date={date}
      />
    </Fragment>
  );
};

Day.propTypes = {
  day: PropTypes.object.isRequired
};

export default Day;
