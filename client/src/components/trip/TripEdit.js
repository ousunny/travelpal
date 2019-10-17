import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateTrip, deleteTrip } from '../../actions/trip';

import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Button,
  IconButton,
  TextField,
  Grid
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const TripEdit = ({ trip, updateTrip, deleteTrip, onClose, open }) => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    destination: ''
  });

  useEffect(() => {
    setFormData({
      title: trip.title ? trip.title : '',
      description: trip.description ? trip.description : '',
      destination: trip.destination ? trip.destination : ''
    });
  }, [trip.title, trip.description, trip.destination]);

  const handleClickDelete = () => {
    deleteTrip(trip._id);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateTrip(trip._id, formData);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const { title, description, destination } = formData;

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle name="title" className={classes.dialogTitle}>
          {title}
          <IconButton onClick={handleClickDelete}>
            <Delete />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form id="trip-form" onSubmit={e => onSubmit(e)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  value={title}
                  onChange={e => onChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Destination"
                  name="destination"
                  value={destination}
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
                  value={description}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Fragment>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" form="trip-form" color="primary">
              Save
            </Button>
          </Fragment>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

TripEdit.propTypes = {
  trip: PropTypes.object.isRequired,
  updateTrip: PropTypes.func.isRequired,
  deleteTrip: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateTrip, deleteTrip }
)(TripEdit);
