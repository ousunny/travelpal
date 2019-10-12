import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Moment from 'react-moment';

import { updateActivity, deleteActivity } from '../../actions/trip';

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

const ActivityDialog = ({
  tripId,
  activity,
  updateActivity,
  deleteActivity,
  onClose,
  open
}) => {
  const classes = useStyles();
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
  }, [activity.title, activity.description]);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleClickDelete = () => {
    deleteActivity(tripId, activity.date, activity._id);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateActivity(tripId, activity.date, activity._id, formData);
    setEdit(false);
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
        <DialogTitle name="title" className={classes.dialogTitle}>
          {title}
          <IconButton onClick={handleClickDelete}>
            <Delete />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form id="activity-form" onSubmit={e => onSubmit(e)}>
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <TextField
                  disabled={!edit}
                  label="Title"
                  name="title"
                  value={title}
                  onChange={e => onChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2}>
                <Moment format="YYYY/MM/DD">{activity.date}</Moment>
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
  updateActivity: PropTypes.func.isRequired,
  deleteActivity: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateActivity, deleteActivity }
)(ActivityDialog);
