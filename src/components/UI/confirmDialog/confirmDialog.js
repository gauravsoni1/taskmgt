import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@material-ui/core';

function transition(props) {
  return <Slide direction='up' {...props} />;
}

const ConfirmDialog = (props) => {

  return (
    <Dialog open={props.open} TransitionComponent={transition} onClose={props.disagree}>
      <DialogTitle>Delete Task ?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Once deleted the task cannot be restored
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.agree}>
          Agree
        </Button>
        <Button onClick={props.disagree}>
          Disagree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog;