import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tasks: null
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return {};
    case actionTypes.DELETE_TASK:
      return {};
    case actionTypes.GET_TASKS:
      let tasks = [];
      for (let key in action.tasks) {
        tasks.push({
          ...action.tasks[key],
          id: key
        });
      }
      return {
        ...state,
        tasks: tasks
      };
    default:
      return state;
  }
};

export default reducer;
