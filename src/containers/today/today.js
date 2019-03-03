import React, { Component } from "react";
import classes from "./today.module.scss";
import "./today.scss";

import { CSSTransition } from "react-transition-group";

import TaskGrid from "../../components/UI/taskGrid/taskGrid";

import {
  Button,
  CircularProgress
} from "@material-ui/core";

import AddTask from "../../components/addTask/addTask";
import AddUpdateTask from '../../components/addUpdateTask/addUpdateTask';

import { connect } from "react-redux";
import * as taskActions from "../../store/actions";

import axios from "axios";

class Today extends Component {
  componentDidMount() {
    this.props.getTasks();
  }

  state = {
    isAddingTask: false,
    container: false,
    isUpdateTask:false,
    currentTask:null
  };

  closeEditWindow = () =>{
    this.setState({isUpdateTask:false});
  }

  updateTask = task => {
    this.setState({isUpdateTask:true,currentTask:task}); 
  };

  updateTaskToServer = task =>{
    this.props.updateTask(task)
  }


  addTodo = () => {
    this.setState(prevstate => {
      return {
        container: !prevstate.container
      };
    });
  };

  deleteTask = task => {
    this.props.deleteTask(task.id);
  };

  saveTask = taskData => {
    this.props.addTask(taskData);
  };

  render() {
    return (
      <>
        {/* Navigation and heading */}
        <div className={classes.heading}>
          <h2 >Today</h2>         
          <Button variant="contained" color="primary" onClick={this.addTodo}>
            Add Todo
          </Button>
        </div>

        <CSSTransition
          in={this.state.container}
          appear={this.state.container}
          classNames="addTaskAnimation"
          timeout={300}
          unmountOnExit
        >
          <div className="addTaskContainer">
            <AddTask
              saveTask={this.saveTask}
              isAddingTask={this.state.isAddingTask}
            />
          </div>
        </CSSTransition>

        <div className={classes.taskItemsContainer}>
          {this.props.tasks ? (
            <TaskGrid
              taskList={this.props.tasks}
              deleteTask={this.deleteTask}
              updateTask={this.updateTask}
            />
          ) : (
            <CircularProgress />
          )}
        </div>
        <AddUpdateTask task={this.state.currentTask} open={this.state.isUpdateTask} close={this.closeEditWindow} updateTask={this.updateTaskToServer}/>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => dispatch(taskActions.getTasks()),
    deleteTask: id => dispatch(taskActions.deleteTask(id)),
    addTask: task => dispatch(taskActions.addTask(task)),
    updateTask:task => dispatch(taskActions.updateTask(task))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Today);
