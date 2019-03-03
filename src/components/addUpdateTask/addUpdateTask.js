import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Paper,
  TextField,
  Tooltip,
  Slide,
  CircularProgress,
  withStyles
} from "@material-ui/core";
import moment from "moment";
import { FlagOutlined, CalendarTodayOutlined } from "@material-ui/icons";

import classes from "./addUpdateTask.module.scss";

function transition(props) {
  return <Slide direction="up" {...props} />;
}

const StyleDialog = withStyles({
  paper: {
    width: "600px",
    height: "410px"
  }
})(Dialog);

class AddUpdateTask extends Component {
  componentDidMount() {
    this.setState({task:this.props.task})
  }

  componentDidUpdate(prevProps) {
    if (this.props.task !== prevProps.task) {
      this.setState({task:this.props.task})
    }
  }

  state = {
    task: null,
    loading: false
  };


  //Clicking the update Button
  updateTask = () => {
    this.props.updateTask(this.state.task);
  };

  //Update the state when changing any of the input boxes
  updateData = (dataType, evt) => {
    let task = null;
    if (dataType === "deadline" || dataType === 'dueDate'){
      task = { ...this.state.task, [dataType]: Number(moment(evt.target.value).format('x'))};
    }else{
      task = { ...this.state.task, [dataType]: evt.target.value };
    }    
    this.setState({ task });
  };

  render() {
    return (
      <StyleDialog
        open={this.props.open}
        onClose={this.props.close}
        TransitionComponent={transition}
        className={classes.addUpdateDialog}
      >
        <DialogTitle>Update Task</DialogTitle>
        {this.props.task ? (
          <>
            <Paper className={classes.addTaskContainer}>
              <TextField
                defaultValue={this.props.task.title}
                onChange={e => this.updateData("title", e)}
                className={classes.textBox}
                variant="outlined"
                placeholder="Enter task name"
                label="Task name"
                fullWidth
              />

              <TextField
                defaultValue={this.props.task.description}
                onChange={e => this.updateData("description", e)}
                variant="outlined"
                placeholder="Notes.."
                label="Task Notes"
                fullWidth
                multiline
                rows="3"
              />

              <div className={classes.datePicker}>
                <Tooltip title="Due Date">
                  <CalendarTodayOutlined />
                </Tooltip>
                <input
                  defaultValue={moment(this.props.task.dueDate).format(
                    "YYYY-MM-DD"
                  )}
                  onChange={e=>this.updateData('dueDate',e)}
                  type="date"
                />

                <div className={classes.spacer} />
                <Tooltip title="Deadline">
                  <FlagOutlined />
                </Tooltip>
                <input
                  defaultValue={moment(this.props.task.deadline).format(
                    "YYYY-MM-DD"
                  )}
                  onChange={e=>this.updateData('deadline',e)}
                  type="date"
                />
              </div>
            </Paper>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={this.updateTask}
              >
                Update
              </Button>
              <Button type="submit" onClick={this.props.close}>
                Cancel
              </Button>
            </DialogActions>
          </>
        ) : (
          <div className={classes.progressContainer}>
            <CircularProgress />
          </div>
        )}
      </StyleDialog>
    );
  }
}

export default AddUpdateTask;