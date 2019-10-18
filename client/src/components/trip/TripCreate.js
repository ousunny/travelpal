import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { createTrip } from '../../actions/trip';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Button,
  TextField,
  Grid
} from '@material-ui/core';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TripCreate = ({ createTrip, history, onClose, open }) => {
  // const [dates, setDates] = React.useState({
  //   startDate: null,
  //   endDate: null
  // });
  const [focusedInput, setFocusedInput] = React.useState(null);

  const [formData, setFormData] = React.useState({
    title: '',
    date: {
      start: null,
      end: null
    },
    description: '',
    destination: ''
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnDaysChange = ({ startDate, endDate }) => {
    setFormData({
      ...formData,
      date: { start: startDate, end: endDate }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    createTrip(formData, history);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const { title, description, date, destination } = formData;

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle>Create Trip</DialogTitle>
      <DialogContent>
        <form id="trip-form" onSubmit={e => onSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                required
                onChange={e => onChange(e)}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <DateRangePicker
                startDate={date.start}
                startDateId="start"
                endDate={date.end}
                endDateId="end"
                onDatesChange={handleOnDaysChange}
                focusedInput={focusedInput}
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Destination"
                name="destination"
                required
                onChange={e => onChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows="5"
                name="description"
                fullWidth
                onChange={e => onChange(e)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" form="trip-form" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TripCreate.propTypes = {
  createTrip: PropTypes.func.isRequired
};

export default connect(
  null,
  { createTrip }
)(withRouter(TripCreate));
