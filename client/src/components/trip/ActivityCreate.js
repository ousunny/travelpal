import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Moment from 'react-moment';

import { createActivity } from '../../actions/trip';

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

const ActivityCreate = ({ tripId, date, createActivity, onClose, open }) => {
  const cleanForm = {
    title: '',
    date,
    description: ''
  };

  const [edit, setEdit] = React.useState(false);
  const [formData, setFormData] = React.useState(cleanForm);

  useEffect(() => {
    setFormData({
      date: date ? date : ''
    });
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createActivity(tripId, formData);
    setFormData(cleanForm);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const { title, description } = formData;

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle>
        <p>Create Activity</p>
        <Moment format="YYYY/MM/DD">{date}</Moment>
      </DialogTitle>
      <DialogContent>
        <form id="activity-form" onSubmit={e => onSubmit(e)}>
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
        <Button type="submit" form="activity-form" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ActivityCreate.propTypes = {
  date: PropTypes.string.isRequired,
  createActivity: PropTypes.func.isRequired
};

export default connect(
  null,
  { createActivity }
)(ActivityCreate);
