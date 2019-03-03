import React, { Component } from 'react';

import { Paper, TextField, Tooltip, Button,CircularProgress } from '@material-ui/core';
import { CalendarTodayOutlined, FlagOutlined, ArrowRightAltOutlined } from '@material-ui/icons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import moment from 'moment';

import classes from './addTask.module.scss';

class AddTask extends Component {
  state = {
    dueDate: new Date(),
    deadline: new Date(),
    taskTitle: '',
    taskDescription: ''
  }

  updateDueDate = (date) => {
    this.setState({ dueDate: date });
  }

  updateDeadline = (date) => {
    this.setState({ deadline: date });
  }

  updateTaskTitle = (evt) => {
    this.setState({ taskTitle: evt.target.value });
  }

  updateTaskDescription = (evt) => {
    this.setState({ taskDescription: evt.target.value })
  }


  addTask = () => {
    this.props.saveTask({
      'title':this.state.taskTitle,
      'description':this.state.taskDescription,
      'dueDate':Number(moment(this.state.dueDate).format('x')),
      'deadline':Number(moment(this.state.deadline).format('x')),
      "checked":false
    });
  }

  render() {
    return (
      <>
        <Paper className={classes.addTaskContainer}>
          <TextField
            value={this.state.taskTitle}
            onChange={this.updateTaskTitle}
            className={classes.textBox}
            variant="outlined"
            placeholder="Enter task name"
            label="Task name"
            fullWidth></TextField>

          <TextField
            value={this.state.taskDescription}
            onChange={this.updateTaskDescription}
            variant="outlined"
            placeholder="Notes.."
            label="Task Notes"
            fullWidth
            multiline
            rows="3"></TextField>


          <div className={classes.datePicker}>
            <Tooltip title="When"><CalendarTodayOutlined /></Tooltip>
            <DatePicker dateFormat='dd/MM/yyyy' selected={this.state.dueDate} onChange={this.updateDueDate}></DatePicker>
            <div className={classes.spacer}></div>
            <Tooltip title="Deadline"><FlagOutlined /></Tooltip>
            <DatePicker dateFormat='dd/MM/yyyy' selected={this.state.deadline} onChange={this.updateDeadline}></DatePicker>
          </div>

          <div className={classes.addTaskActions}>
            {this.props.isAddingTask ? 
              <CircularProgress></CircularProgress>
              :<Button variant="contained" color="primary" size="small" className={classes.saveButton} onClick={this.addTask}> Save Task<ArrowRightAltOutlined /></Button> }
          </div>
        </Paper>
      </>
    )
  }


}

export default AddTask;