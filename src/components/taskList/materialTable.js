import React, { Component } from 'react';

import { Paper,Checkbox } from '@material-ui/core';

import { Grid, Table, TableHeaderRow,TableSelection, PagingPanel,TableEditColumn } from '@devexpress/dx-react-grid-material-ui';
import { SelectionState, PagingState, IntegratedPaging, IntegratedSelection, EditingState, TableColumnReordering } from '@devexpress/dx-react-grid';

class MaterialTable extends Component {

  state = {
    selection:[]
  }

  onChangeSelection = (selection) =>{
    this.setState({selection});
  }

  addNewTask = index => console.log('the index is',index);

  commitEditChanges = (changes) =>{
    console.log(changes);
  }

  headerCellComponent =() =>{
    return (
      <TableEditColumn.HeaderCell>
        Actions
      </TableEditColumn.HeaderCell>   
    )
  }

  actionsMenuComponent = () =>{
    return (
      <TableEditColumn.Cell>
        <button onClick={this.addNewTask}>Save</button>
        <button>Edit</button>
        <button>Delete</button>
      </TableEditColumn.Cell>
    )
  }

  render() {
    return (
      <Paper>
        <Grid
          rows={[
            { id: 0, name: 'Grocery', description: 'Buy Stuff from Grocery',status:'pending'},
            { id: 1, name: 'labour office', description: 'File complaint against labour Labour ',status:'pending', },
            { id: 2, name: 'Go to lulu', description: 'Buy stuff from lulu ',status:'pending', },
            { id: 3, name: 'labour office', description: 'File complaint against labour Labour and then go to Office  ',status:'pending', },
            { id: 5, name: 'labour office', description: 'File complaint against labour Labour ',status:'pending', },
            { id: 6, name: 'labour office', description: 'File complaint against labour Labour ',status:'pending', },
            { id: 7, name: 'labour office', description: 'File complaint against labour Labour ',status:'pending', },
            { id: 8, name: 'labour office', description: 'File complaint against labour Labour ',status:'pending', },
            { id: 9, name: 'labour office', description: 'File complaint against labour Labour ',status:'pending', },
            { id: 10, name: 'labour office', description: 'File complaint against labour Labour ',status:'pending', },
          ]}
          columns={[
            { name: 'id', title: 'ID' },
            { name: 'name', title: 'Name' },
            { name: 'description', title: 'Description', },
            { name: 'status', title: 'Status' }
          ]}>
          {/* <EditingState onCommitChanges={this.commitEditChanges}></EditingState> */}
          {/* <PagingState defaultCurrentPage={0} pageSize={5}></PagingState> */}
          {/* <SelectionState selection={this.state.selection} onSelectionChange={this.onChangeSelection}/> */}
          {/* <IntegratedSelection></IntegratedSelection>           */}
          {/* <IntegratedPaging></IntegratedPaging> */}
          <Table columnExtensions={[{"columnName":"description",wordWrapEnabled:true},{"columnName":"id",width:50}]}/>
          <TableColumnReordering defaultOrder={['id','name','description','status','actions']}></TableColumnReordering>
          {/* <TableHeaderRow />           */}
          {/* <TableSelection showSelectAll/>           */}
          {/* <PagingPanel></PagingPanel> */}
          {/* <TableEditColumn headerCellComponent={this.headerCellComponent} cellComponent={this.actionsMenuComponent}></TableEditColumn> */}
        </Grid>
      </Paper>
    );
  }
}
export default MaterialTable;