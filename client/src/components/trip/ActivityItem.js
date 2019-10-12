import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateActivity, interested } from '../../actions/trip';

import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
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
import { ThumbUp } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  interested: {
    marginRight: theme.spacing(1),
    fontSize: '1.2rem'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActivityItem = ({ tripId, activity, updateActivity, interested }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEdit(false);
    setOpen(false);
  };

  const { title, description } = formData;

  return (
    <Fragment>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemText
          primary={activity.title}
          secondary={activity.description}
        />
        <div className={classes.interested}>{activity.interested.length}</div>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="interested"
            onClick={() => interested(tripId, activity.date, activity._id)}
          >
            <ThumbUp />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

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

ActivityItem.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired,
  interested: PropTypes.func
};

export default connect(
  null,
  { updateActivity, interested }
)(ActivityItem);
