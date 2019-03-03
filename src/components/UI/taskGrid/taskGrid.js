import React, { Component } from 'react';

import classes from './taskGrid.module.scss';

import { Delete, Edit } from '@material-ui/icons';
import ConfirmDialog from '../confirmDialog/confirmDialog';

import moment from 'moment';

class taskGrid extends Component {
  

  state ={
    showConfirmDeleteDialog:false,
    showEditDialog:false,
    currentTask:null,
  }

  //Delete Dialog functions

  confirmDelete =() =>{
    this.props.deleteTask(this.state.currentTask);
    this.setState({showConfirmDeleteDialog:false});
  };

  confirmDeleteDialog = (task) =>{
    this.setState({showConfirmDeleteDialog:true,currentTask:task});
  };

  disagreeDelete = () =>{
    this.setState({showConfirmDeleteDialog:false});
  };

  //Edit Dialog functions

  updateTask = (task) =>{
    this.props.updateTask(task);
  }

  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <td>Task Name</td>
              <td>Description</td>
              <td className={classes.min_90}>Deadline</td>
              <td className={classes.min_90}>Due Date</td>
              <td className={classes.min_90}>Actions</td>
            </tr>
          </thead>

          <tbody>
            {this.props.taskList.map(task => {
              return (
                <tr key={task.id} onDoubleClick={()=>this.updateTask(task)}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{moment(task.deadline).format('DD/MMM/YYYY')}</td>
                  <td>{moment(task.dueDate).format('DD/MMM/YYYY')}</td>
                  <td>
                    <Edit onClick={()=>this.updateTask(task)} />
                    <Delete onClick={()=>this.confirmDeleteDialog(task)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <ConfirmDialog  open={this.state.showConfirmDeleteDialog} agree={this.confirmDelete} disagree={this.disagreeDelete}></ConfirmDialog>        
      </>
    )
  }
};

export default taskGrid;