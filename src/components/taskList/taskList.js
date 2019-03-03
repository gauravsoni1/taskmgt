import React, { Component } from 'react';

import { FlagOutlined } from '@material-ui/icons';
import { Checkbox } from '@material-ui/core';

import classes from './taskList.module.scss';


class TaskList extends Component {

  renderTask(task) {
    return (
      <div key={task.id} className={classes.taskContainer}>
        <div className={classes.taskTitleContainer}>
          <Checkbox onChange={() => this.props.toggleChecked(task)} checked={task.checked}></Checkbox>
          <span className={classes.taskTitle}>{task.title}</span>
          <div className={classes.dueDates}>
            <FlagOutlined />
            <span>Due: 12 Dec 2019</span>
          </div>
        </div>
        {this.props.showDescription ? <span className={classes.taskDescription}>{task.description}</span> : null}
      </div>
    )
  };

  render() {
    return (
      <>
        {this.props.list.map(task => {
          if (!this.props.showCompleted) {
            if (!task.checked) {
              return this.renderTask(task)
            }
            else{
              return null;
            }
          }
          return this.renderTask(task)          
        })
        }
      </>
    )
  }
};

export default TaskList;