import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateTrip } from '../../actions/trip';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Slide,
  Button,
  TextField
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TripInformation = ({ trip, updateTrip, onClose, open }) => {
  const [edit, setEdit] = React.useState(false);
  const [formData, setFormData] = React.useState({
    information: ''
  });

  useEffect(() => {
    setFormData({
      information: trip.information ? trip.information : ''
    });
  }, [trip.information]);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateTrip(trip._id, formData);
    setEdit(false);
  };

  const handleClose = () => {
    setEdit(false);
    onClose();
  };

  const { information } = formData;

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle name="title">Information</DialogTitle>
        <DialogContent>
          <form id="information-form" onSubmit={e => onSubmit(e)}>
            <TextField
              disabled={!edit}
              label="information"
              multiline
              rows="5"
              name="information"
              fullWidth
              onChange={e => onChange(e)}
              value={information}
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          {edit ? (
            <Fragment>
              <Button onClick={toggleEdit} color="secondary">
                Cancel
              </Button>
              <Button type="submit" form="information-form" color="primary">
                Save
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button onClick={toggleEdit}>Edit</Button>
              <Button onClick={handleClose}>Close</Button>
            </Fragment>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

TripInformation.propTypes = {
  trip: PropTypes.object.isRequired,
  updateTrip: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateTrip }
)(TripInformation);
