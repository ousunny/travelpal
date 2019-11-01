import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateMembers } from '../../actions/trip';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Slide,
  IconButton,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import {
  PersonAddOutlined,
  RemoveCircleOutlineOutlined
} from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TripMember = ({ auth, trip, updateMembers, onClose, open }) => {
  const [formData, setFormData] = React.useState({
    username: ''
  });

  const { _id: tripId, user, members } = trip;

  const handleRemoveClick = e => {
    updateMembers(tripId, 'remove', e.currentTarget.value);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateMembers(tripId, 'add', username);
  };

  const handleClose = () => {
    onClose();
  };

  const { username } = formData;
  const { _id: userId } = auth.user;

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle name="title">Members</DialogTitle>
        <DialogContent>
          <form id="member-form" onSubmit={e => onSubmit(e)}>
            <TextField
              label="Add"
              name="username"
              fullWidth
              onChange={e => onChange(e)}
              placeholder="Type a username here..."
              variant="outlined"
            />
            <IconButton type="submit">
              <PersonAddOutlined />
            </IconButton>
          </form>
          <List>
            {members.map(member => (
              <ListItem key={member._id}>
                <ListItemText primary={member.username} />
                <Fragment>
                  {(userId.toString() === user.toString() ||
                    userId.toString() === member._id) && (
                    <IconButton
                      value={member.username}
                      onClick={handleRemoveClick}
                    >
                      <RemoveCircleOutlineOutlined />
                    </IconButton>
                  )}
                </Fragment>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

TripMember.propTypes = {
  trip: PropTypes.object.isRequired,
  updateMembers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateMembers }
)(TripMember);
