import * as actionTypes from "./actionTypes";
import axios from "axios";

//Get task from Server
const getTaskFromServer = tasks => {
  return {
    type: actionTypes.GET_TASKS,
    tasks: tasks
  };
};

export const getTasks = () => {
  return dispatch => {
    axios
      .get("https://taskmanagement-bd92f.firebaseio.com/task.json")
      .then(res => {
        dispatch(getTaskFromServer(res.data));
      })
      .catch(error => {});
  };
};

//Add new task

export const addTaskToServer = task => {
  return {
    type: actionTypes.ADD_TASK,
    task: task
  };
};

export const addTask = task => {
  return dispatch => {
    axios
      .post("https://taskmanagement-bd92f.firebaseio.com/task.json", task)
      .then(data => {
        dispatch(getTasks());
      })
      .catch(err => {
        console.log(err);
      });
  };
};

//Delete task using the ID

export const deleteTask = id => {
  return dispatch => {
    axios
      .delete(
        "https://taskmanagement-bd92f.firebaseio.com/task/" + id + ".json"
      )
      .then(data => {
        dispatch(getTasks());
      })
      .catch(err => {
        console.log(err);
      });
  };
};

//Update a task

export const updateTask = task => {
  return dispatch => {
    axios
      .patch(
        "https://taskmanagement-bd92f.firebaseio.com/task/" + task.id + ".json",
        task
      )
      .then(data=>{
        dispatch(getTasks());
      })
      .catch(err => {
        console.log(err);
      });
  };
};
