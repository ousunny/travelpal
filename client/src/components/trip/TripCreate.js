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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TripCreate = ({ createTrip, history, onClose, open }) => {
  const [edit, setEdit] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    date: {
      start: '',
      end: ''
    },
    description: '',
    destination: ''
  });

  const onChange = e => {
    if (e.target.name === 'start' || e.target.name === 'end') {
      date[e.target.name] = e.target.value;
      setFormData({ ...formData, date });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
            <Grid item xs={6}>
              <TextField
                type="date"
                label="Start"
                name="start"
                required
                onChange={e => onChange(e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                label="End"
                name="end"
                required
                onChange={e => onChange(e)}
                variant="outlined"
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
