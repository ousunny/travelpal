import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateActivity } from '../../actions/trip';

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

const ActivityDialog = ({
  tripId,
  activity,
  updateActivity,
  onClose,
  open
}) => {
  const [edit, setEdit] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    setFormData({
      title: activity.title ? activity.title : '',
      description: activity.description ? activity.description : ''
    });
  }, []);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateActivity(tripId, activity.date, activity._id, formData);
    onClose();
  };

  const handleClose = () => {
    setEdit(false);
    onClose();
  };

  const { title, description } = formData;

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle name="title">{title}</DialogTitle>
        <DialogContent>
          <form id="activity-form" onSubmit={e => onSubmit(e)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  disabled={!edit}
                  label="Title"
                  name="title"
                  value={title}
                  onChange={e => onChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={!edit}
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
          {edit ? (
            <Fragment>
              <Button onClick={toggleEdit} color="secondary">
                Cancel
              </Button>
              <Button type="submit" form="activity-form" color="primary">
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

ActivityDialog.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateActivity }
)(ActivityDialog);
